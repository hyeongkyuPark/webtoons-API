const express = require('express');
const nunjucks = require('nunjucks');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

class App {
    constructor() {
        this.app = express();

        //뷰엔진 세팅
        this.setViewEngine();

        //미들웨어 세팅
        this.setMiddelWare();

        //정적 디렉토리 추가
        this.setStatic();

        //로컬 변수
        this.setLocals();

        //라우팅
        this.getRouting();

        //404 페이지를 찾을수가 없음
        this.status404();

        //에러처리
        this.errorHandler();
    }

    setMiddelWare() {
        //미들웨어 세팅
        this.app.use(cors());
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
    }

    setViewEngine() {
        nunjucks.configure('template', {
            autoescape: true,
            express: this.app
        });
    }

    setStatic() {
        this.app.use('/uploads', express.static('uploads'));
    }

    setLocals() {
        //템플릿 변수
        this.app.use((request, response, next) => {
            this.app.locals.isLogin = true;
            this.app.locals.request_path = request.path;
            next();
        });
    }

    getRouting() {
        this.app.use(require('./controllers'));
    }

    status404() {
        this.app.use((request, response, _) => {
            response.status(404).render('common/404.html')
        });
    }

    errorHandler() {
        this.app.use((err, request, response, _) => {
            response.status(500).render('common/500.html')
        });
    }
}

module.exports = new App().app;