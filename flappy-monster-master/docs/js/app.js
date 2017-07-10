(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _screensManager = require('./managers/screensManager');

var _screensManager2 = _interopRequireDefault(_screensManager);

var _assetsManager = require('./managers/assetsManager');

var _assetsManager2 = _interopRequireDefault(_assetsManager);

var _serverManager = require('./managers/serverManager');

var _serverManager2 = _interopRequireDefault(_serverManager);

var _soundManager = require('./managers/soundManager');

var _soundManager2 = _interopRequireDefault(_soundManager);

var _dataManager = require('./managers/dataManager');

var _dataManager2 = _interopRequireDefault(_dataManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Promise.all([_assetsManager2.default.init(), _serverManager2.default.init()]).then(function () {
  return Promise.all([_serverManager2.default.getUser().then(function (user) {
    return _dataManager2.default.set('user', {
      id: user.id,
      name: user.first_name + ' ' + user.last_name,
      sex: user.sex
    });
  }), _serverManager2.default.get('maxScore').then(function (r) {
    return _dataManager2.default.set('maxScore', +r);
  }), _serverManager2.default.get('sound').then(function (r) {
    return _soundManager2.default.init(r === '' ? true : !!r);
  })]);
}).then(function () {
  return _screensManager2.default.change('StartScreen');
}).catch(function (e) {
  return console.error('init error, reload page', e);
});

var stage = new createjs.Stage('game-stage');
_screensManager2.default.init(stage);

if (createjs.Touch.isSupported()) {
  createjs.Touch.enable(stage, true);
} else {
  stage.enableMouseOver(20);
}

if (window !== window.parent) {
  // createjs stage click dosnt trigger window.focus
  window.addEventListener('click', function () {
    return window.focus();
  });
}

},{"./managers/assetsManager":9,"./managers/dataManager":10,"./managers/screensManager":11,"./managers/serverManager":12,"./managers/soundManager":13}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assetsManager = require('../managers/assetsManager');

var _assetsManager2 = _interopRequireDefault(_assetsManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Background = function (_createjs$Shape) {
  _inherits(Background, _createjs$Shape);

  function Background(name, canvasWidth) {
    _classCallCheck(this, Background);

    var _this = _possibleConstructorReturn(this, (Background.__proto__ || Object.getPrototypeOf(Background)).call(this));

    _this.img = _assetsManager2.default.getResult(name);
    var width = _this.img.width + canvasWidth;

    _this.graphics.beginBitmapFill(_this.img, 'repeat-x').drawRect(0, 0, width, _this.img.height);
    _this.regY = _this.img.height;
    _this.cache(0, 0, width, _this.img.height);
    return _this;
  }

  _createClass(Background, [{
    key: 'move',
    value: function move(path) {
      this.x -= path;
      this.x %= this.img.width;
    }
  }]);

  return Background;
}(createjs.Shape);

exports.default = Background;

},{"../managers/assetsManager":9}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assetsManager = require('../managers/assetsManager');

var _assetsManager2 = _interopRequireDefault(_assetsManager);

var _soundManager = require('../managers/soundManager');

var _soundManager2 = _interopRequireDefault(_soundManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Btn = function (_createjs$Container) {
  _inherits(Btn, _createjs$Container);

  function Btn(label) {
    var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'green';
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'btn';

    _classCallCheck(this, Btn);

    var _this = _possibleConstructorReturn(this, (Btn.__proto__ || Object.getPrototypeOf(Btn)).call(this));

    _this.color = color;

    _this.createBg(type);
    _this.createLabel(label);

    _this.addEventListener('click', function () {
      return _soundManager2.default.play('flap');
    });
    return _this;
  }

  _createClass(Btn, [{
    key: 'createBg',
    value: function createBg(type) {
      this.bg = new createjs.Sprite(_assetsManager2.default.getSpriteSheet(type));
      this.bg.regX = this.bg.getBounds().width / 2;
      this.bg.regY = this.bg.getBounds().height / 2;
      this.helper = new createjs.ButtonHelper(this.bg, this.color + 'Out', this.color + 'Over', this.color + 'Down');
      this.addChild(this.bg);
    }
  }, {
    key: 'createLabel',
    value: function createLabel(label) {
      this.label = new createjs.Text(label, '30px Guerilla', '#fff');
      this.label.shadow = new createjs.Shadow('#000', 0, 1, 5);
      this.label.textAlign = 'center';
      this.label.textBaseline = 'middle';
      this.label.mouseEnabled = false;
      this.label.y = -3;

      // todo cache
      // now it cache before font load (
      // const h = this.label.getMeasuredHeight() + 6; // add 6 cos of shadow
      // const w = this.label.getMeasuredWidth() + 6;
      // this.label.cache(-w / 2, -h / 2, w, h);

      this.addChild(this.label);
    }
  }, {
    key: 'disable',
    value: function disable() {
      this.bg.gotoAndStop('disable');
      this.mouseEnabled = false;
    }
  }, {
    key: 'enable',
    value: function enable() {
      this.bg.gotoAndStop(this.color + 'Out');
      this.mouseEnabled = true;
    }
  }]);

  return Btn;
}(createjs.Container);

exports.default = Btn;

},{"../managers/assetsManager":9,"../managers/soundManager":13}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _screensManager = require('../managers/screensManager');

var _screensManager2 = _interopRequireDefault(_screensManager);

var _soundManager = require('../managers/soundManager');

var _soundManager2 = _interopRequireDefault(_soundManager);

var _serverManager = require('../managers/serverManager');

var _serverManager2 = _interopRequireDefault(_serverManager);

var _IconBtn = require('./IconBtn');

var _IconBtn2 = _interopRequireDefault(_IconBtn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gui = function (_createjs$Container) {
  _inherits(Gui, _createjs$Container);

  function Gui(width) {
    _classCallCheck(this, Gui);

    var _this = _possibleConstructorReturn(this, (Gui.__proto__ || Object.getPrototypeOf(Gui)).call(this));

    _this.width = width;

    _this.menuBtn = new _IconBtn2.default('menu');
    _this.menuBtn.x = _this.menuBtn.getBounds().width / 2 + 20;
    _this.menuBtn.y = _this.menuBtn.getBounds().height / 2 + 20;

    _this.ratingBtn = new _IconBtn2.default('rating');
    _this.ratingBtn.x = _this.ratingBtn.getBounds().width * 3 / 2 + 40;
    _this.ratingBtn.y = _this.ratingBtn.getBounds().height / 2 + 20;

    _this.soundBtn = new _IconBtn2.default(_soundManager2.default.isEnabled() ? 'sound' : 'soundOff');
    _this.soundBtn.x = _this.width - _this.soundBtn.getBounds().width / 2 - 20;
    _this.soundBtn.y = _this.soundBtn.getBounds().height / 2 + 20;

    // todo: fix spritesheet later
    _this.ratingBtn.label.x = _this.soundBtn.label.x = 1;

    _this.addChild(_this.menuBtn, _this.ratingBtn, _this.soundBtn);

    _this.soundBtn.addEventListener('click', function () {
      _soundManager2.default.toggle();
      _this.soundBtn.changeLabel(_soundManager2.default.isEnabled() ? 'sound' : 'soundOff');
      _serverManager2.default.set('sound', _soundManager2.default.isEnabled());
    });

    _this.menuBtn.addEventListener('click', function () {
      return _screensManager2.default.change('StartScreen');
    });
    _this.ratingBtn.addEventListener('click', function () {
      return _screensManager2.default.change('RatingScreen');
    });
    return _this;
  }

  return Gui;
}(createjs.Container);

exports.default = Gui;

},{"../managers/screensManager":11,"../managers/serverManager":12,"../managers/soundManager":13,"./IconBtn":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assetsManager = require('../managers/assetsManager');

var _assetsManager2 = _interopRequireDefault(_assetsManager);

var _soundManager = require('../managers/soundManager');

var _soundManager2 = _interopRequireDefault(_soundManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CONFIG = {
  G: 0.16,
  A: 7
};

var Hero = function (_createjs$Sprite) {
  _inherits(Hero, _createjs$Sprite);

  function Hero(type) {
    _classCallCheck(this, Hero);

    var _this = _possibleConstructorReturn(this, (Hero.__proto__ || Object.getPrototypeOf(Hero)).call(this, _assetsManager2.default.getSpriteSheet(type)));

    _this.type = type;
    _this.bounds = _this.getBounds();
    _this.regX = _this.bounds.width / 2;
    _this.regY = _this.bounds.height / 2;

    _this.dead = false;
    _this.vY = 0;
    return _this;
  }

  _createClass(Hero, [{
    key: 'flap',
    value: function flap() {
      if (this.dead) {
        return;
      }
      this.vY = Math.max(this.vY - CONFIG.A, -CONFIG.A);
      this.gotoAndPlay('flap');
      _soundManager2.default.play('flap');
    }
  }, {
    key: 'move',
    value: function move() {
      this.vY += CONFIG.G;
      this.y += this.vY;
    }
  }, {
    key: 'die',
    value: function die() {
      if (this.dead) {
        return;
      }
      this.dead = true;
      this.rotation = 30;
      this.gotoAndStop('dead');
      _soundManager2.default.play('loose');
    }
  }]);

  return Hero;
}(createjs.Sprite);

exports.default = Hero;

},{"../managers/assetsManager":9,"../managers/soundManager":13}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assetsManager = require('../managers/assetsManager');

var _assetsManager2 = _interopRequireDefault(_assetsManager);

var _Btn2 = require('./Btn');

var _Btn3 = _interopRequireDefault(_Btn2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IconBtn = function (_Btn) {
  _inherits(IconBtn, _Btn);

  function IconBtn(label) {
    var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'orange';

    _classCallCheck(this, IconBtn);

    return _possibleConstructorReturn(this, (IconBtn.__proto__ || Object.getPrototypeOf(IconBtn)).call(this, label, color, 'iconBtn'));
  }

  _createClass(IconBtn, [{
    key: 'createLabel',
    value: function createLabel(label) {
      this.label = new createjs.Sprite(_assetsManager2.default.getSpriteSheet('icon'), label);
      this.label.regX = this.label.getBounds().width / 2;
      this.label.regY = this.label.getBounds().height / 2;
      this.label.mouseEnabled = false;
      this.addChild(this.label);
    }
  }, {
    key: 'changeLabel',
    value: function changeLabel(label) {
      this.label.gotoAndStop(label);
    }
  }]);

  return IconBtn;
}(_Btn3.default);

exports.default = IconBtn;

},{"../managers/assetsManager":9,"./Btn":3}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShadowOverlay = function (_createjs$Container) {
  _inherits(ShadowOverlay, _createjs$Container);

  function ShadowOverlay(width, height) {
    _classCallCheck(this, ShadowOverlay);

    var _this = _possibleConstructorReturn(this, (ShadowOverlay.__proto__ || Object.getPrototypeOf(ShadowOverlay)).call(this));

    _this.shadow = new createjs.Shape();
    _this.shadow.graphics.beginFill('rgba(0, 0, 0, 0.6)').drawRect(0, 0, width, height);

    _this.shadowText = new createjs.Text('', '30px Guerilla', '#fff');
    _this.shadowText.y = height / 2;
    _this.shadowText.x = width / 2;
    _this.shadowText.textAlign = 'center';
    _this.shadowText.textBaseline = 'middle';

    _this.addChild(_this.shadow, _this.shadowText);
    // todo
    // this.cache(0, 0, width, height);
    return _this;
  }

  _createClass(ShadowOverlay, [{
    key: 'setText',
    value: function setText(text) {
      this.shadowText.text = text;
      // this.updateCache();
    }
  }]);

  return ShadowOverlay;
}(createjs.Container);

exports.default = ShadowOverlay;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assetsManager = require('../managers/assetsManager');

var _assetsManager2 = _interopRequireDefault(_assetsManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Spike = function (_createjs$Bitmap) {
  _inherits(Spike, _createjs$Bitmap);

  function Spike() {
    _classCallCheck(this, Spike);

    var _this = _possibleConstructorReturn(this, (Spike.__proto__ || Object.getPrototypeOf(Spike)).call(this, _assetsManager2.default.getResult('spike')));

    _this.bounds = _this.getBounds();
    _this.regX = _this.bounds.width / 2;
    _this.regY = _this.bounds.height;
    return _this;
  }

  return Spike;
}(createjs.Bitmap);

exports.default = Spike;

},{"../managers/assetsManager":9}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var manifest = [{ id: 'monster', src: 'img/monster-sprite.png' },
// { id: 'bird', src: 'img/bird-sprite.png' },
// { id: 'chicken', src: 'img/chicken-sprite.png' },
{ id: 'spike', src: 'img/spike.png' }, { id: 'sky', src: 'img/bg/sky.png' }, { id: 'start', src: 'img/bg/start.png' }, { id: 'mountain', src: 'img/bg/mountain.png' }, { id: 'ground', src: 'img/bg/ground.png' }, { id: 'btn', src: 'img/btn-sprite.png' }, { id: 'icon-btn', src: 'img/icon-btn-sprite.png' }, { id: 'icon', src: 'img/icon-sprite.png' }, { id: 'back', src: 'sound/background.ogg' }, { id: 'flap', src: 'sound/flap.ogg' }, { id: 'loose', src: 'sound/loose.ogg' }];

var getHeroSpriteSheetData = function getHeroSpriteSheetData(name) {
  return {
    images: [name],
    frames: { width: 100, height: 78 },
    animations: {
      fly: 0,
      flap: [1, 3, 'fly'],
      dead: 4
    }
  };
};

var spriteSheetsData = {
  bird: getHeroSpriteSheetData('bird'),
  monster: getHeroSpriteSheetData('monster'),
  chicken: getHeroSpriteSheetData('chicken'),
  btn: {
    images: ['btn'],
    frames: { width: 210, height: 69, spacing: 2 },
    animations: {
      greenOut: 0,
      greenOver: 2,
      greenDown: 4,
      orangeOut: 6,
      orangeOver: 8,
      orangeDown: 1,
      redOut: 3,
      redOver: 5,
      redDown: 7,
      disable: 9
    }
  },
  iconBtn: {
    images: ['icon-btn'],
    frames: { width: 69, height: 71, spacing: 2 },
    animations: {
      greenOut: 0,
      greenOver: 1,
      greenDown: 2,
      orangeOut: 3,
      orangeOver: 4,
      orangeDown: 5,
      redOut: 8,
      redOver: 7,
      redDown: 6,
      disable: 9
    }
  },
  icon: {
    images: ['icon'],
    frames: { width: 40, height: 40 },
    animations: {
      sound: 0,
      soundOff: 1,
      rating: 2,
      menu: 3
    }
  }
};

var spriteSheets = {};

var assetsManager = {
  init: function init() {
    var _this = this;

    createjs.Sound.alternateExtensions = ['mp3'];
    this.queue = new createjs.LoadQueue();
    this.queue.installPlugin(createjs.Sound);
    this.queue.loadManifest(manifest);

    return new Promise(function (resolve, reject) {
      _this.queue.addEventListener('complete', function () {
        return resolve();
      });
      _this.queue.addEventListener('error', function () {
        return reject();
      });
    });
  },
  getResult: function getResult(name) {
    return this.queue.getResult(name);
  },
  getSpriteSheet: function getSpriteSheet(name) {
    var _this2 = this;

    if (!spriteSheets[name]) {
      var data = spriteSheetsData[name];

      if (!data) {
        throw new Error('invalid spriteSheet name');
      }

      data.images = data.images.map(function (img) {
        return _this2.getResult(img);
      });
      spriteSheets[name] = new createjs.SpriteSheet(data);
    }

    return spriteSheets[name];
  }
};

exports.default = assetsManager;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var dataManager = {
  gameType: null,
  gameMode: null,
  score: null,
  maxScore: null,
  heroType: 'monster',
  pos: null,
  win: null,
  spikes: null,
  actions: null,
  user: {
    id: null,
    name: null,
    sex: null
  },
  enemy: null,
  fields: {
    normal: [[0, 99], [100, 199]],
    upsideDown: [[200, 224], [225, 249]],
    backward: [[250, 274], [275, 299]],
    fast: [[300, 324], [325, 349]],
    slow: [[350, 374], [375, 399]],
    earthquake: [[400, 424], [425, 449]],
    fog: [[450, 474], [475, 499]]
  },
  set: function set(key, value) {
    this[key] = value;
  }
};

exports.default = dataManager;

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _StartScreen = require('../screens/StartScreen');

var _StartScreen2 = _interopRequireDefault(_StartScreen);

var _MainScreen = require('../screens/MainScreen');

var _MainScreen2 = _interopRequireDefault(_MainScreen);

var _PVPScreen = require('../screens/PVPScreen');

var _PVPScreen2 = _interopRequireDefault(_PVPScreen);

var _EndScreen = require('../screens/EndScreen');

var _EndScreen2 = _interopRequireDefault(_EndScreen);

var _RatingScreen = require('../screens/RatingScreen');

var _RatingScreen2 = _interopRequireDefault(_RatingScreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var screenManager = {
  init: function init(stage) {
    var _this = this;

    this.stage = stage;
    this.currentScreen = null;
    this.screens = {
      StartScreen: _StartScreen2.default,
      MainScreen: _MainScreen2.default,
      PVPScreen: _PVPScreen2.default,
      EndScreen: _EndScreen2.default,
      RatingScreen: _RatingScreen2.default
    };

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener('tick', function (e) {
      if (_this.currentScreen && _this.currentScreen.tick) {
        _this.currentScreen.tick(e);
      }
      _this.stage.update(e);
    });
  },
  change: function change(name) {
    if (this.currentScreen) {
      if (this.currentScreen.destroy) {
        this.currentScreen.destroy();
      }
      this.stage.removeChild(this.currentScreen);
    }
    this.currentScreen = new this.screens[name](this.stage.canvas.width, this.stage.canvas.height);
    this.stage.addChild(this.currentScreen);
  }
};

exports.default = screenManager;

},{"../screens/EndScreen":14,"../screens/MainScreen":15,"../screens/PVPScreen":16,"../screens/RatingScreen":17,"../screens/StartScreen":18}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var serverManager = {
  init: function init() {
    return new Promise(function (resolve, reject) {
      return VK.init(function () {
        return resolve();
      }, function (e) {
        return reject('vk init error', e);
      }, '5.60');
    });
  },
  getUser: function getUser() {
    return new Promise(function (resolve, reject) {
      VK.api('users.get', { fields: 'sex' }, function (r) {
        if (r.error) {
          reject(r.error);
          return;
        }
        resolve(r.response[0]);
      });
    });
  },
  get: function get(key) {
    var global = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    return new Promise(function (resolve) {
      return VK.api('storage.get', { key: key, global: global }, resolve);
    }).then(function (r) {
      if (r.error) {
        throw new Error(r.error);
      } else if (r.response === '') {
        // cant JSON.parse empty string but need to get default value
        return '';
      }
      return JSON.parse(r.response);
    });
  },
  set: function set(key, value) {
    var global = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    VK.api('storage.set', { key: key, value: JSON.stringify(value), global: global });
  },
  share: function share(message, photo) {
    var photos = {
      single: 'photo-135563388_456239017',
      pvp: 'photo-135563388_456239026'
    };
    VK.api('wall.post', {
      message: message,
      attachments: photos[photo] + ', https://vk.com/app5782118',
      services: 'twitter'
    });
  },
  invite: function invite() {
    VK.callMethod('showInviteBox');
  }
};

exports.default = serverManager;

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var soundManager = {
  init: function init(enable) {
    this.enabled = enable;
    this.bg = createjs.Sound.play('back', { loop: -1, volume: 0.3 });
    this.bg.paused = !this.enabled;
    // sometimes negative value occurs and throw error
    this.bg.position = 0;
  },
  toggle: function toggle() {
    this.enabled = !this.enabled;
    this.bg.paused = !this.enabled;
  },
  isEnabled: function isEnabled() {
    return this.enabled;
  },
  play: function play(sound) {
    if (this.enabled) {
      createjs.Sound.play(sound);
    }
  }
};

exports.default = soundManager;

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _randomInt = require('random-int');

var _randomInt2 = _interopRequireDefault(_randomInt);

var _assetsManager = require('../managers/assetsManager');

var _assetsManager2 = _interopRequireDefault(_assetsManager);

var _screensManager = require('../managers/screensManager');

var _screensManager2 = _interopRequireDefault(_screensManager);

var _serverManager = require('../managers/serverManager');

var _serverManager2 = _interopRequireDefault(_serverManager);

var _dataManager = require('../managers/dataManager');

var _dataManager2 = _interopRequireDefault(_dataManager);

var _Gui = require('../display/Gui');

var _Gui2 = _interopRequireDefault(_Gui);

var _Btn = require('../display/Btn');

var _Btn2 = _interopRequireDefault(_Btn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EndScreen = function (_createjs$Container) {
  _inherits(EndScreen, _createjs$Container);

  function EndScreen(width) {
    _classCallCheck(this, EndScreen);

    var _this = _possibleConstructorReturn(this, (EndScreen.__proto__ || Object.getPrototypeOf(EndScreen)).call(this));

    _this.bg = new createjs.Bitmap(_assetsManager2.default.getResult('start'));
    _this.gui = new _Gui2.default(width);

    _this.maxScore = new createjs.Text('\u0420\u0435\u043A\u043E\u0440\u0434: ' + _dataManager2.default.maxScore + ' \u043C', '25px Guerilla', '#000');
    _this.maxScore.textAlign = 'center';
    _this.maxScore.x = width / 2;
    _this.maxScore.y = 40;

    _this.score = new createjs.Text('\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442: ' + _dataManager2.default.score + ' \u043C', '40px Guerilla', '#000');
    _this.score.textAlign = 'center';
    _this.score.x = width / 2;
    _this.score.y = 150;

    _this.replayBtn = new _Btn2.default('Еще раз');
    _this.replayBtn.x = width / 2;
    _this.replayBtn.y = 350;

    _this.shareBtn = new _Btn2.default('Поделиться', 'orange');
    _this.shareBtn.x = width / 2;
    _this.shareBtn.y = 440;

    _this.addChild(_this.bg, _this.gui, _this.maxScore, _this.score, _this.replayBtn, _this.shareBtn);

    if (_dataManager2.default.score > _dataManager2.default.maxScore) {
      _this.maxScore.text = '\u041F\u0440\u043E\u0448\u043B\u044B\u0439 \u0440\u0435\u043A\u043E\u0440\u0434: ' + _dataManager2.default.maxScore + ' \u043C';
      _dataManager2.default.maxScore = _dataManager2.default.score;
      _serverManager2.default.set('maxScore', _dataManager2.default.maxScore);
      _this.score.text = '\u041D\u043E\u0432\u044B\u0439 \u0440\u0435\u043A\u043E\u0440\u0434: ' + _dataManager2.default.maxScore + ' \u043C!';

      _serverManager2.default.get('ratingTable', 1).then(recalcRatingTable);
    }

    if (_dataManager2.default.gameType === 'pvp') {
      _this.pvpText = new createjs.Text('', '25px Guerilla', '#000');
      _this.pvpText.textAlign = 'center';
      _this.pvpText.x = width / 2;
      _this.pvpText.y = 230;
      _this.addChild(_this.pvpText);

      if (_dataManager2.default.win) {
        _this.pvpText.text += _dataManager2.default.enemy.name + ' \u0431\u044B\u043B' + (_dataManager2.default.enemy.sex !== 2 ? 'а' : '') + ' \u043F\u043E\u0432\u0435\u0440\u0436\u0435\u043D' + (_dataManager2.default.enemy.sex !== 2 ? 'а' : '');
      } else {
        _this.pvpText.text += _dataManager2.default.enemy.name + ' \u043F\u043E\u0432\u0435\u0440\u0433' + (_dataManager2.default.enemy.sex !== 2 ? 'ла' : '') + ' \u0412\u0430\u0441';
      }
    }

    var range = _dataManager2.default.fields[_dataManager2.default.gameMode][_dataManager2.default.pos];
    var field = 'pvp' + (0, _randomInt2.default)(range[0], range[1]);
    var record = {
      user: _dataManager2.default.user,
      spikes: _dataManager2.default.spikes,
      actions: _dataManager2.default.actions
    };

    _serverManager2.default.get(field, 1).then(function (r) {
      console.warn(field);
      console.warn(record);
      console.warn(r);

      if ((!r || r.spikes.length * 0.5 < record.spikes.length) && JSON.stringify(record).length < 4096) {
        console.warn(true);
        _serverManager2.default.set(field, record, 1);
      }
    });

    _this.bindEvents();
    return _this;
  }

  _createClass(EndScreen, [{
    key: 'bindEvents',
    value: function bindEvents() {
      this.replayBtn.addEventListener('click', replay);
      this.shareBtn.addEventListener('click', share);

      this.onKeyDown = function (e) {
        if (e.keyCode === 32) {
          replay();
          e.preventDefault();
        }
      };
      window.addEventListener('keydown', this.onKeyDown);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      window.removeEventListener('keydown', this.onKeyDown);
    }
  }]);

  return EndScreen;
}(createjs.Container);

exports.default = EndScreen;


function replay() {
  switch (_dataManager2.default.gameType) {
    case 'single':
      _screensManager2.default.change('MainScreen');
      break;
    case 'pvp':
      _screensManager2.default.change('PVPScreen');
      break;
  }
}

function share() {
  var message = '';
  switch (_dataManager2.default.gameType) {
    case 'single':
      message = '\u042F \u043F\u0440\u043E\u043B\u0435\u0442\u0435\u043B' + (_dataManager2.default.user.sex !== 2 ? 'а' : '') + ' ' + _dataManager2.default.score + ' \u043C \u0432 \u0438\u0433\u0440\u0435 Flappy Monster!';
      if (_dataManager2.default.score === _dataManager2.default.maxScore) {
        message += '\nЭто мой новый рекорд! ';
      }
      message += '\nА сколько сможешь ты?';
      break;
    case 'pvp':
      if (_dataManager2.default.win) {
        message += _dataManager2.default.enemy.name + ' \u0431\u044B\u043B' + (_dataManager2.default.enemy.sex !== 2 ? 'а' : '') + ' \u043F\u043E\u0432\u0435\u0440\u0436\u0435\u043D' + (_dataManager2.default.enemy.sex !== 2 ? 'а' : '') + ' \u043C\u043D\u043E\u0439 \u0432 \u0438\u0433\u0440\u0435 Flappy Monster!';
      } else {
        message += _dataManager2.default.enemy.name + ' \u043F\u043E\u0432\u0435\u0440\u0433' + (_dataManager2.default.enemy.sex !== 2 ? 'ла' : '') + ' \u043C\u0435\u043D\u044F \u0432 \u0438\u0433\u0440\u0435 Flappy Monster,\n                   \u043D\u0443 \u043D\u0438\u0447\u0435\u0433\u043E, \u0435\u0449\u0435 \u0443\u0432\u0438\u0434\u0438\u043C\u0441\u044F...';
      }
      if (_dataManager2.default.score === _dataManager2.default.maxScore) {
        message += '\n\u041C\u043E\u0439 \u043D\u043E\u0432\u044B\u0439 \u0440\u0435\u043A\u043E\u0440\u0434 ' + _dataManager2.default.score + ' \u043C!';
      }
      break;
  }
  _serverManager2.default.share(message, _dataManager2.default.gameType);
}

function recalcRatingTable(ratingTable) {
  if (ratingTable[ratingTable.length - 1].score >= _dataManager2.default.maxScore) {
    return;
  }

  var userRating = ratingTable.find(function (el) {
    return el.id === _dataManager2.default.user.id;
  });

  if (userRating) {
    userRating.score = _dataManager2.default.maxScore;
  } else {
    var newRating = {
      id: _dataManager2.default.user.id,
      name: _dataManager2.default.user.name,
      score: _dataManager2.default.maxScore
    };
    if (ratingTable.length < 10) {
      ratingTable.push(newRating);
    } else {
      ratingTable[ratingTable.length - 1] = newRating;
    }
  }

  ratingTable.sort(function (a, b) {
    return b.score - a.score;
  });
  _serverManager2.default.set('ratingTable', ratingTable, 1);
}

},{"../display/Btn":3,"../display/Gui":4,"../managers/assetsManager":9,"../managers/dataManager":10,"../managers/screensManager":11,"../managers/serverManager":12,"random-int":19}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _randomInt = require('random-int');

var _randomInt2 = _interopRequireDefault(_randomInt);

var _screensManager = require('../managers/screensManager');

var _screensManager2 = _interopRequireDefault(_screensManager);

var _dataManager = require('../managers/dataManager');

var _dataManager2 = _interopRequireDefault(_dataManager);

var _Background = require('../display/Background');

var _Background2 = _interopRequireDefault(_Background);

var _Hero = require('../display/Hero');

var _Hero2 = _interopRequireDefault(_Hero);

var _Spike = require('../display/Spike');

var _Spike2 = _interopRequireDefault(_Spike);

var _ShadowOverlay = require('../display/ShadowOverlay');

var _ShadowOverlay2 = _interopRequireDefault(_ShadowOverlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GROUND_HEIGHT = 80;
var START_SPEED = 5;

var MainScreen = function (_createjs$Container) {
  _inherits(MainScreen, _createjs$Container);

  function MainScreen(width, height) {
    _classCallCheck(this, MainScreen);

    var _this = _possibleConstructorReturn(this, (MainScreen.__proto__ || Object.getPrototypeOf(MainScreen)).call(this));

    _this.width = width;
    _this.height = height;

    _this.speed = START_SPEED;
    _this.spikeScale = 0.7;
    _this.step = 0;
    _this.distance = 0;

    _dataManager2.default.gameType = 'single';
    _dataManager2.default.actions = {};
    _dataManager2.default.spikes = [];
    _dataManager2.default.pos = 0;

    _this.shadowOverlay = new _ShadowOverlay2.default(_this.width, _this.height);
    _this.createBg();
    _this.createSpikes();
    _this.createHero();
    _this.createHud();

    _this.pause('Пробел - взмах крыльями, esc - пауза');
    _this.bindEvents();

    _this.title = new createjs.Text('', '65px Guerilla', '#fff');
    _this.title.textAlign = 'center';
    _this.title.textBaseline = 'middle';
    _this.title.x = width / 2;
    _this.title.y = 225;
    _this.addChild(_this.title);

    // normal mode for noobs
    switch (_dataManager2.default.maxScore > 50 ? (0, _randomInt2.default)(10) : 10) {
      case 0:
        _dataManager2.default.gameMode = 'upsideDown';
        _this.title.text = 'Вверх ногами!';
        _this.title.y = height - _this.title.y;
        _this.shadowOverlay.setText('Мир перевернулся');
        _this.hudDistance.y = height - _this.hudDistance.y;
        _this.hudDistance.color = '#fff';
        _this.y = _this.shadowOverlay.y = height;
        _this.scaleY = _this.shadowOverlay.scaleY = _this.title.scaleY = _this.hudDistance.scaleY = -1;
        break;
      case 1:
        _dataManager2.default.gameMode = 'backward';
        _this.title.text = 'Ураган!';
        _this.shadowOverlay.setText('Птицу сдувает назад');
        _this.title.x = width - _this.title.x;
        _this.hudDistance.x = width - _this.hudDistance.x;
        _this.x = _this.shadowOverlay.x = width;
        _this.scaleX = _this.hero.scaleX = _this.shadowOverlay.scaleX = _this.title.scaleX = _this.hudDistance.scaleX = -1;
        break;
      case 2:
        _dataManager2.default.gameMode = 'fast';
        _this.title.text = 'Попутный ветер!';
        _this.shadowOverlay.setText('Скорость полета повышена');
        _this.speed += 2;
        _this.spikeScale -= 0.25;
        break;
      case 3:
        _dataManager2.default.gameMode = 'slow';
        _this.title.text = 'Встречный ветер!';
        _this.shadowOverlay.setText('Скорость полета снижена');
        _this.speed -= 1;
        _this.spikeScale += 0.075;
        break;
      case 4:
        _dataManager2.default.gameMode = 'earthquake';
        _this.title.text = 'Землетрясение!';
        _this.shadowOverlay.setText('Колья раскачиваются');
        _this.spikes.forEach(function (spike, i) {
          spike.tween = createjs.Tween.get(spike, { loop: true, paused: true }).to({ skewX: 9 }, 900 + i * 100).to({ skewX: -9 }, 1800 + i * 200).to({ skewX: 0 }, 900 + i * 100);
        });
        break;
      case 5:
        _dataManager2.default.gameMode = 'fog';
        _this.title.text = 'Туман!';
        _this.shadowOverlay.setText('Видимость снижена');
        _this.speed -= 1.2;
        _this.fog = new createjs.Shape();
        _this.fog.graphics.beginRadialGradientFill(['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, .65)', 'rgba(255, 255, 255, .85)', 'rgba(255, 255, 255, .97)', '#fff'], [0, 0.5, 0.7, 0.9, 1], 0, 0, 0, 0, 0, 380).drawRect(-_this.width / 2, -_this.height, _this.width, _this.height * 2);
        _this.fog.cache(-_this.width / 2, -_this.height, _this.width, _this.height * 2);
        _this.fog.x = _this.hero.x;
        _this.fog.y = _this.hero.y;
        _this.fog.addEventListener('tick', function () {
          if (!_this.hero.dead) {
            _this.fog.y = _this.hero.y;
          }
        });
        _this.addChild(_this.fog, _this.hudDistance);
        break;
      default:
        _dataManager2.default.gameMode = 'normal';
        break;
    }
    _this.spikes.forEach(function (spike) {
      return _this.resetSpike(spike);
    });
    console.log(_dataManager2.default.gameMode);
    return _this;
  }

  _createClass(MainScreen, [{
    key: 'createBg',
    value: function createBg() {
      this.bgSky = new _Background2.default('sky', this.width);
      this.bgMountain = new _Background2.default('mountain', this.width);
      this.bgGround = new _Background2.default('ground', this.width);
      this.bgSky.y = this.bgMountain.y = this.bgGround.y = this.height;
      this.addChild(this.bgSky, this.bgMountain, this.bgGround);
    }
  }, {
    key: 'createSpikes',
    value: function createSpikes() {
      this.spikes = [new _Spike2.default(), new _Spike2.default()];
      this.spikes[0].x = -this.spikes[0].bounds.width / 2;
      this.spikes[1].x = this.width / 2;
      this.addChild.apply(this, _toConsumableArray(this.spikes));
    }
  }, {
    key: 'createHero',
    value: function createHero() {
      this.hero = new _Hero2.default(_dataManager2.default.heroType);
      this.hero.x = this.width / 2;
      this.hero.y = 190;
      this.addChild(this.hero);
    }
  }, {
    key: 'createHud',
    value: function createHud() {
      this.hudDistance = new createjs.Text('0 м', '25px Guerilla', '#000');
      this.hudDistance.x = 20;
      this.hudDistance.y = 15;
      this.addChild(this.hudDistance);
    }
  }, {
    key: 'resetSpike',
    value: function resetSpike(spike) {
      spike.scaleY = +(this.spikeScale + Math.random() * 0.45).toFixed(2);
      spike.x += this.width + spike.bounds.width;
      if (Math.random() > 0.5) {
        spike.y = this.height - GROUND_HEIGHT;
      } else {
        spike.y = 0;
        spike.scaleY = -spike.scaleY;
      }
      _dataManager2.default.spikes.push(spike.scaleY);
    }
  }, {
    key: 'pause',
    value: function pause(text) {
      this.paused = true;
      this.shadowOverlay.setText(text);
      this.addChild(this.shadowOverlay);
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this2 = this;

      this.addEventListener('click', function () {
        return _this2.handleAction();
      });
      this.onKeyDown = function (e) {
        switch (e.keyCode) {
          case 32:
            _this2.handleAction();
            e.preventDefault();
            break;
          case 27:
            _this2.togglePause();
            break;
        }
      };

      window.addEventListener('keydown', this.onKeyDown);
    }
  }, {
    key: 'handleAction',
    value: function handleAction() {
      if (this.paused) {
        if (this.title) {
          this.removeChild(this.title);
          this.title = null;
        }
        this.togglePause();
      } else {
        this.hero.flap();
        _dataManager2.default.actions[this.step] = 1;
      }
    }
  }, {
    key: 'togglePause',
    value: function togglePause() {
      var _this3 = this;

      if (this.paused) {
        this.paused = false;
        this.removeChild(this.shadowOverlay);
      } else {
        this.pause('Нажмите пробел или esc');
      }
      if (_dataManager2.default.gameMode === 'earthquake') {
        this.spikes.forEach(function (spike) {
          return spike.tween.setPaused(_this3.paused);
        });
      }
    }
  }, {
    key: 'moveWorld',
    value: function moveWorld() {
      if (this.hero.dead) {
        this.hero.x += this.speed * 0.5;
      } else {
        this.moveSpikes(this.speed);
        this.bgSky.move(this.speed * 0.1);
        this.bgMountain.move(this.speed * 0.3);
        this.bgGround.move(this.speed);

        this.distance += this.speed;
        _dataManager2.default.score = Math.floor(this.distance / 25);
        this.hudDistance.text = _dataManager2.default.score + ' \u043C';
      }
    }
  }, {
    key: 'moveSpikes',
    value: function moveSpikes() {
      var _this4 = this;

      this.spikes.forEach(function (spike) {
        spike.x -= _this4.speed;
        if (spike.x < -spike.bounds.width / 2) {
          _this4.resetSpike(spike);
          _this4.speed += 0.04;
        }
        if (ndgmr.checkPixelCollision(_this4.hero, spike)) {
          _this4.hero.die();
        }
      });
    }
  }, {
    key: 'moveHero',
    value: function moveHero() {
      this.hero.move();
      if (this.hero.y < 0) {
        this.hero.vY = 0;
        this.hero.y = 0;
      } else if (this.hero.y > this.height + this.hero.bounds.height / 2) {
        _screensManager2.default.change('EndScreen');
      } else if (this.hero.y > this.height - (GROUND_HEIGHT + this.hero.bounds.height / 2)) {
        this.hero.die();
      }
    }
  }, {
    key: 'tick',
    value: function tick() {
      if (this.paused) {
        return;
      }
      this.moveWorld();
      this.moveHero();
      this.step += 1;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      window.removeEventListener('keydown', this.onKeyDown);
    }
  }]);

  return MainScreen;
}(createjs.Container);

exports.default = MainScreen;

},{"../display/Background":2,"../display/Hero":5,"../display/ShadowOverlay":7,"../display/Spike":8,"../managers/dataManager":10,"../managers/screensManager":11,"random-int":19}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _randomInt = require('random-int');

var _randomInt2 = _interopRequireDefault(_randomInt);

var _screensManager = require('../managers/screensManager');

var _screensManager2 = _interopRequireDefault(_screensManager);

var _serverManager = require('../managers/serverManager');

var _serverManager2 = _interopRequireDefault(_serverManager);

var _dataManager = require('../managers/dataManager');

var _dataManager2 = _interopRequireDefault(_dataManager);

var _Background = require('../display/Background');

var _Background2 = _interopRequireDefault(_Background);

var _Hero = require('../display/Hero');

var _Hero2 = _interopRequireDefault(_Hero);

var _Spike = require('../display/Spike');

var _Spike2 = _interopRequireDefault(_Spike);

var _Btn = require('../display/Btn');

var _Btn2 = _interopRequireDefault(_Btn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GROUND_HEIGHT = 80;
var START_SPEED = 5;

var MainScreen = function (_createjs$Container) {
  _inherits(MainScreen, _createjs$Container);

  function MainScreen(width, height) {
    _classCallCheck(this, MainScreen);

    var _this = _possibleConstructorReturn(this, (MainScreen.__proto__ || Object.getPrototypeOf(MainScreen)).call(this));

    _this.width = width;
    _this.height = height;

    _this.speed = START_SPEED;
    _this.started = false;

    _this.createBg();

    var watingText = new createjs.Text('Идет подбор соперника', '35px Guerilla', '#000');
    watingText.textAlign = 'center';
    watingText.x = width / 2;
    watingText.y = 170;

    var cancelBtn = new _Btn2.default('Отмена', 'orange');
    cancelBtn.x = width / 2;
    cancelBtn.y = 340;
    cancelBtn.addEventListener('click', function () {
      return _screensManager2.default.change('StartScreen');
    });

    _this.addChild(watingText, cancelBtn);

    var modes = {
      0: 'upsideDown',
      1: 'backward',
      2: 'fast',
      3: 'slow',
      4: 'earthquake',
      5: 'fog',
      6: 'normal',
      7: 'normal',
      8: 'normal',
      9: 'normal',
      10: 'normal'
    };
    _dataManager2.default.gameMode = modes[_dataManager2.default.maxScore > 50 ? (0, _randomInt2.default)(10) : 10];
    console.log(_dataManager2.default.gameMode);
    _dataManager2.default.pos = (0, _randomInt2.default)(1);

    var enemyRange = _dataManager2.default.fields[_dataManager2.default.gameMode][1 - _dataManager2.default.pos];
    var enemyField = 'pvp' + (0, _randomInt2.default)(enemyRange[0], enemyRange[1]);
    console.warn(enemyField);

    Promise.all([_serverManager2.default.get(enemyField, 1).then(function (r) {
      return _this.initData(r);
    }), new Promise(function (resolve) {
      return setTimeout(resolve, Math.random() * 2000 + 500);
    })]).then(function () {
      _this.init();
      _this.removeChild(watingText, cancelBtn);
    }).catch(function (e) {
      watingText.text = 'PVP временно недоступно :(';
      console.error(e);
    });

    _this.bindEvents();
    return _this;
  }

  _createClass(MainScreen, [{
    key: 'initData',
    value: function initData(record) {
      _dataManager2.default.gameType = 'pvp';
      _dataManager2.default.win = false;
      _dataManager2.default.actions = {};
      _dataManager2.default.spikes = [];
      _dataManager2.default.enemy = record.user;
      this.enemySpikes = record.spikes;
      this.enemyActions = record.actions;
      if (_dataManager2.default.user.id === record.user.id) {
        _dataManager2.default.enemy.name = 'Призрачный птиц';
      }
    }
  }, {
    key: 'init',
    value: function init() {
      var _this2 = this;

      this.spikeIndex = 0;
      this.step = 0;
      this.distance = 0;

      this.createSpikes();
      this.createHud();

      var counter = new createjs.Text(3, '125px Guerilla', '#000');
      counter.textAlign = 'center';
      counter.x = this.width / 2;
      counter.y = 310;

      this.addChild(counter);

      var interval = setInterval(function () {
        counter.text -= 1;
        if (counter.text < 0) {
          _this2.removeChild(counter);
          _this2.started = true;
          if (_dataManager2.default.gameMode === 'earthquake') {
            _this2.spikes.forEach(function (spike) {
              return spike.tween.setPaused(false);
            });
          }
          _this2.removeChild(_this2.title, _this2.shadowText);
          clearInterval(interval);
        }
      }, 1000);

      this.hero = this.createHero(_dataManager2.default.pos, _dataManager2.default.user.name);
      this.enemy = this.createHero(1 - _dataManager2.default.pos, _dataManager2.default.enemy.name);
      this.enemy.alpha = 0.5;

      this.title = new createjs.Text('', '65px Guerilla', '#000');
      this.title.textAlign = 'center';
      this.title.textBaseline = 'middle';
      this.title.x = this.width / 2;
      this.title.y = 225;
      this.addChild(this.title);

      this.shadowText = new createjs.Text('', '30px Guerilla', '#000');
      this.shadowText.y = this.height / 2;
      this.shadowText.x = this.width / 2;
      this.shadowText.textAlign = 'center';
      this.shadowText.textBaseline = 'middle';
      this.addChild(this.shadowText);

      this.title.y += 55;
      this.shadowText.y += 40;
      counter.y += 50;

      switch (_dataManager2.default.gameMode) {
        case 'upsideDown':
          this.title.text = 'Вверх ногами!';
          this.shadowText.text = 'Мир перевернулся';
          this.hudDistance.y = this.height - this.hudDistance.y;
          this.hudDistance.color = '#fff';
          this.y = this.height;
          counter.y = 550;
          this.title.y += 85;
          this.shadowText.y -= 45;
          this.scaleY = counter.scaleY = this.shadowText.scaleY = this.title.scaleY = this.hudDistance.scaleY = -1;
          break;
        case 'backward':
          this.title.text = 'Ураган!';
          this.shadowText.text = 'Птицу сдувает назад';
          this.title.x = this.width - this.title.x;
          this.hudDistance.x = this.width - this.hudDistance.x;
          this.x = this.width;
          this.scaleX = counter.scaleX = this.hero.scaleX = this.enemy.scaleX = this.shadowText.scaleX = this.title.scaleX = this.hudDistance.scaleX = -1;
          break;
        case 'fast':
          this.title.text = 'Попутный ветер!';
          this.shadowText.text = 'Скорость полета повышена';
          this.speed += 2;
          this.spikeScale -= 0.25;
          break;
        case 'slow':
          this.title.text = 'Встречный ветер!';
          this.shadowText.text = 'Скорость полета снижена';
          this.speed -= 1;
          this.spikeScale += 0.075;
          break;
        case 'earthquake':
          this.title.text = 'Землетрясение!';
          this.shadowText.text = 'Колья раскачиваются';
          this.spikes.forEach(function (spike, i) {
            spike.tween = createjs.Tween.get(spike, { loop: true, paused: true }).to({ skewX: 9 }, 900 + i * 100).to({ skewX: -9 }, 1800 + i * 200).to({ skewX: 0 }, 900 + i * 100);
          });
          break;
        case 'fog':
          this.title.text = 'Туман!';
          this.shadowText.text = 'Видимость снижена';
          this.speed -= 1.2;
          this.fog = new createjs.Shape();
          this.fog.graphics.beginRadialGradientFill(['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, .65)', 'rgba(255, 255, 255, .85)', 'rgba(255, 255, 255, .97)', '#fff'], [0, 0.5, 0.7, 0.9, 1], 0, 0, 0, 0, 0, 380).drawRect(-this.width / 2, -this.height, this.width * 1.5, this.height * 2);
          this.fog.cache(-this.width / 2, -this.height, this.width * 1.5, this.height * 2);
          this.fog.x = this.hero.x;
          this.fog.y = this.hero.y;
          this.fog.addEventListener('tick', function () {
            if (!_this2.hero.dead) {
              _this2.fog.y = _this2.hero.y;
            }
          });
          this.addChild(this.fog, this.hudDistance, counter);
          break;
      }
      this.spikes.forEach(function (spike) {
        return _this2.resetSpike(spike);
      });
    }
  }, {
    key: 'createBg',
    value: function createBg() {
      this.bgSky = new _Background2.default('sky', this.width);
      this.bgMountain = new _Background2.default('mountain', this.width);
      this.bgGround = new _Background2.default('ground', this.width);
      this.bgSky.y = this.bgMountain.y = this.bgGround.y = this.height;
      this.addChild(this.bgSky, this.bgMountain, this.bgGround);
    }
  }, {
    key: 'createSpikes',
    value: function createSpikes() {
      this.spikes = [new _Spike2.default(), new _Spike2.default()];
      this.spikes[0].x = -this.spikes[0].bounds.width / 2;
      this.spikes[1].x = this.width / 2;
      this.addChild.apply(this, _toConsumableArray(this.spikes));
    }
  }, {
    key: 'createHero',
    value: function createHero(pos, name) {
      var _this3 = this;

      var hero = new _Hero2.default(_dataManager2.default.heroType);
      hero.x = this.width / 2 - 180 * pos;
      hero.y = 190 - 50 * pos;

      var heroName = new createjs.Text(name, '25px Guerilla', '#000');
      heroName.textAlign = 'center';
      heroName.y = hero.y - 100;
      heroName.x = hero.x;
      if (_dataManager2.default.gameMode === 'upsideDown') {
        heroName.scaleY = -1;
        heroName.y += 30;
      }
      if (_dataManager2.default.gameMode === 'backward') {
        heroName.scaleX = -1;
      }
      this.addChild(hero, heroName);

      createjs.Tween.get(heroName).wait(2400).to({ alpha: 0 }, 800).call(function () {
        return _this3.removeChild(heroName);
      });

      return hero;
    }
  }, {
    key: 'createHud',
    value: function createHud() {
      this.hudDistance = new createjs.Text('0 м', '25px Guerilla', '#000');
      this.hudDistance.x = 20;
      this.hudDistance.y = 15;
      this.addChild(this.hudDistance);
    }
  }, {
    key: 'resetSpike',
    value: function resetSpike(spike) {
      spike.x += this.width + spike.bounds.width;

      if (this.enemySpikes[this.spikeIndex]) {
        spike.scaleY = this.enemySpikes[this.spikeIndex];
        this.spikeIndex += 1;

        if (spike.scaleY > 0) {
          spike.y = this.height - GROUND_HEIGHT;
        } else {
          spike.y = 0;
        }
      } else {
        spike.scaleY = +(0.7 + Math.random() * 0.45).toFixed(2);
        if (Math.random() > 0.5) {
          spike.y = this.height - GROUND_HEIGHT;
        } else {
          spike.y = 0;
          spike.scaleY = -spike.scaleY;
        }
      }
      _dataManager2.default.spikes.push(spike.scaleY);
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this4 = this;

      this.addEventListener('click', function () {
        return _this4.handleAction();
      });
      this.onKeyDown = function (e) {
        _this4.handleAction();
        e.preventDefault();
      };

      window.addEventListener('keydown', this.onKeyDown);
    }
  }, {
    key: 'handleAction',
    value: function handleAction() {
      if (!this.started) {
        return;
      }
      this.hero.flap();
      _dataManager2.default.actions[this.step] = 1;
    }
  }, {
    key: 'moveWorld',
    value: function moveWorld() {
      this.moveSpikes(this.speed);
      this.bgSky.move(this.speed * 0.1);
      this.bgMountain.move(this.speed * 0.3);
      this.bgGround.move(this.speed);

      this.distance += this.speed;
      _dataManager2.default.score = Math.floor(this.distance / 25);
      this.hudDistance.text = _dataManager2.default.score + ' \u043C';
    }
  }, {
    key: 'moveSpikes',
    value: function moveSpikes() {
      var _this5 = this;

      this.spikes.forEach(function (spike) {
        spike.x -= _this5.speed;
        if (spike.x < -spike.bounds.width / 2) {
          _this5.resetSpike(spike);
          _this5.speed += 0.04;
        }
      });
    }
  }, {
    key: 'moveHero',
    value: function moveHero(hero) {
      hero.move();
      if (hero.y < 0) {
        hero.vY = 0;
        hero.y = 0;
      } else if (hero.y > this.height + hero.bounds.height / 2) {
        if (hero === this.hero) {
          _screensManager2.default.change('EndScreen');
        } else {
          _dataManager2.default.win = true;
        }
      } else if (hero.y > this.height - (GROUND_HEIGHT + hero.bounds.height / 2)) {
        hero.die();
      }
      if (this.spikes.some(function (spike) {
        return ndgmr.checkPixelCollision(hero, spike);
      })) {
        hero.die();
      }
    }
  }, {
    key: 'tick',
    value: function tick() {
      if (!this.started) {
        return;
      }
      this.moveWorld();
      this.moveHero(this.hero);
      this.moveHero(this.enemy);

      this.step += 1;
      if (this.enemyActions[this.step]) {
        this.enemy.flap();
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      window.removeEventListener('keydown', this.onKeyDown);
    }
  }]);

  return MainScreen;
}(createjs.Container);

exports.default = MainScreen;

},{"../display/Background":2,"../display/Btn":3,"../display/Hero":5,"../display/Spike":8,"../managers/dataManager":10,"../managers/screensManager":11,"../managers/serverManager":12,"random-int":19}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assetsManager = require('../managers/assetsManager');

var _assetsManager2 = _interopRequireDefault(_assetsManager);

var _dataManager = require('../managers/dataManager');

var _dataManager2 = _interopRequireDefault(_dataManager);

var _serverManager = require('../managers/serverManager');

var _serverManager2 = _interopRequireDefault(_serverManager);

var _Gui = require('../display/Gui');

var _Gui2 = _interopRequireDefault(_Gui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RatingScreen = function (_createjs$Container) {
  _inherits(RatingScreen, _createjs$Container);

  function RatingScreen(width) {
    _classCallCheck(this, RatingScreen);

    var _this = _possibleConstructorReturn(this, (RatingScreen.__proto__ || Object.getPrototypeOf(RatingScreen)).call(this));

    _this.width = width;

    _this.bg = new createjs.Bitmap(_assetsManager2.default.getResult('start'));
    _this.gui = new _Gui2.default(width);

    _this.title = new createjs.Text('Рейтинг', '35px Guerilla', '#000');
    _this.title.textAlign = 'center';
    _this.title.x = _this.width / 2;
    _this.title.y = 35;

    _this.addChild(_this.bg, _this.gui, _this.title);

    _serverManager2.default.get('ratingTable', 1)
    // todo: remove later, now it add records for old users
    .then(recalcRatingTable).then(function (r) {
      return _this.showRating(r);
    }).catch(function () {
      var text = new createjs.Text('Рейтинг временно недоступен :(', '25px Guerilla', '#000');
      text.textAlign = 'center';
      text.x = _this.width / 2;
      text.y = 150;
      _this.addChild(text);
    });
    return _this;
  }

  _createClass(RatingScreen, [{
    key: 'showRating',
    value: function showRating(ratingTable) {
      var _this2 = this;

      var winner = false;

      ratingTable.forEach(function (el, i) {
        var text = new createjs.Text(i + 1 + ' ' + el.name + ' ' + el.score + ' \u043C', '25px Guerilla', '#000');
        text.y = 120 + i * 40;
        text.x = 120;
        _this2.addChild(text);

        if (el.id === _dataManager2.default.user.id) {
          winner = true;
          text.color = '#7ECE2E';
        }
      });

      if (!winner) {
        var text = new createjs.Text('- ' + _dataManager2.default.user.name + ' ' + _dataManager2.default.maxScore + ' \u043C', '25px Guerilla', '#7ECE2E');
        text.y = 120 + ratingTable.length * 40;
        text.x = 120;
        this.addChild(text);
      }
    }
  }]);

  return RatingScreen;
}(createjs.Container);

exports.default = RatingScreen;


function recalcRatingTable(ratingTable) {
  if (ratingTable[ratingTable.length - 1].score < _dataManager2.default.maxScore) {
    var userRating = ratingTable.find(function (el) {
      return el.id === _dataManager2.default.user.id;
    });

    if (userRating) {
      userRating.score = _dataManager2.default.maxScore;
    } else {
      var newRating = {
        id: _dataManager2.default.user.id,
        name: _dataManager2.default.user.name,
        score: _dataManager2.default.maxScore
      };
      if (ratingTable.length < 10) {
        ratingTable.push(newRating);
      } else {
        ratingTable[ratingTable.length - 1] = newRating;
      }
    }

    ratingTable.sort(function (a, b) {
      return b.score - a.score;
    });
    _serverManager2.default.set('ratingTable', ratingTable, 1);
  }
  return ratingTable;
}

},{"../display/Gui":4,"../managers/assetsManager":9,"../managers/dataManager":10,"../managers/serverManager":12}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _serverManager = require('../managers/serverManager');

var _serverManager2 = _interopRequireDefault(_serverManager);

var _assetsManager = require('../managers/assetsManager');

var _assetsManager2 = _interopRequireDefault(_assetsManager);

var _screensManager = require('../managers/screensManager');

var _screensManager2 = _interopRequireDefault(_screensManager);

var _dataManager = require('../managers/dataManager');

var _dataManager2 = _interopRequireDefault(_dataManager);

var _Gui = require('../display/Gui');

var _Gui2 = _interopRequireDefault(_Gui);

var _Hero = require('../display/Hero');

var _Hero2 = _interopRequireDefault(_Hero);

var _Btn = require('../display/Btn');

var _Btn2 = _interopRequireDefault(_Btn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StartScreen = function (_createjs$Container) {
  _inherits(StartScreen, _createjs$Container);

  function StartScreen(width, height) {
    _classCallCheck(this, StartScreen);

    var _this = _possibleConstructorReturn(this, (StartScreen.__proto__ || Object.getPrototypeOf(StartScreen)).call(this));

    _this.width = width;
    _this.height = height;

    _this.bg = new createjs.Bitmap(_assetsManager2.default.getResult('start'));
    _this.gui = new _Gui2.default(width);

    _this.startBtn = new _Btn2.default('Играть');
    _this.startBtn.x = width / 2;
    _this.startBtn.y = 320;

    _this.pvpBtn = new _Btn2.default('PVP');
    _this.pvpBtn.x = width / 2;
    _this.pvpBtn.y = 410;

    _this.inviteBtn = new _Btn2.default('Позвать бро', 'orange');
    _this.inviteBtn.x = width / 2;
    _this.inviteBtn.y = 500;

    _this.hero = new _Hero2.default('monster');
    _this.hero.x = width / 2;
    _this.hero.y = 190;

    _this.addChild(_this.bg, _this.gui, _this.hero, _this.startBtn, _this.pvpBtn, _this.inviteBtn);

    if (_dataManager2.default.maxScore) {
      _this.score = new createjs.Text('\u0420\u0435\u043A\u043E\u0440\u0434: ' + _dataManager2.default.maxScore + ' \u043C', '25px Guerilla', '#000');
      _this.score.textAlign = 'center';
      _this.score.x = _this.width / 2;
      _this.score.y = 40;
      _this.addChild(_this.score);
    }

    _this.bindEvents();
    return _this;
  }
  // createHeroes() {
  //   this.heroes = [
  //     new Hero('bird'),
  //     new Hero('monster'),
  //     new Hero('chicken'),
  //   ];
  //   this.heroes.forEach((hero, i) => {
  //     hero.y = this.height / 2;
  //     hero.x = (i + 1) * this.width / (this.heroes.length + 1);
  //     hero.cursor = 'pointer';
  //     hero.addEventListener('click', () => this.selectHero(hero));
  //     hero.cache(0, 0, hero.bounds.width, hero.bounds.height);
  //   });
  //   this.heroFilter = new createjs.ColorFilter(0.6, 0.6, 0.6);
  //   this.resetHeroes();
  //   this.addChild(...this.heroes);
  // }
  // resetHeroes() {
  //   this.heroes.forEach(hero => {
  //     hero.filters = [this.heroFilter];
  //     hero.updateCache();
  //     hero.scaleX = 0.85;
  //     hero.scaleY = 0.85;
  //   });
  // }
  // selectHero(hero) {
  //   this.resetHeroes();

  //   hero.filters = [];
  //   hero.updateCache();
  //   hero.scaleX = 1;
  //   hero.scaleY = 1;
  //   hero.flap();

  //   if (!this.startBtn.enabled) {
  //     this.startBtn.enable();
  //   }

  //   dataManager.heroType = hero.type;
  // }


  _createClass(StartScreen, [{
    key: 'bindEvents',
    value: function bindEvents() {
      this.startBtn.addEventListener('click', function () {
        return _screensManager2.default.change('MainScreen');
      });
      this.pvpBtn.addEventListener('click', function () {
        return _screensManager2.default.change('PVPScreen');
      });
      this.inviteBtn.addEventListener('click', function () {
        return _serverManager2.default.invite();
      });

      this.onKeyDown = function (e) {
        if (e.keyCode === 32) {
          _screensManager2.default.change('MainScreen');
          e.preventDefault();
        }
      };

      window.addEventListener('keydown', this.onKeyDown);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      window.removeEventListener('keydown', this.onKeyDown);
    }
  }]);

  return StartScreen;
}(createjs.Container);

exports.default = StartScreen;

},{"../display/Btn":3,"../display/Gui":4,"../display/Hero":5,"../managers/assetsManager":9,"../managers/dataManager":10,"../managers/screensManager":11,"../managers/serverManager":12}],19:[function(require,module,exports){
'use strict';
module.exports = function (min, max) {
	if (max === undefined) {
		max = min;
		min = 0;
	}

	if (typeof min !== 'number' || typeof max !== 'number') {
		throw new TypeError('Expected all arguments to be numbers');
	}

	return Math.floor(Math.random() * (max - min + 1) + min);
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvc3JjL2FwcC5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9CYWNrZ3JvdW5kLmpzIiwiYXBwL2pzL3NyYy9kaXNwbGF5L0J0bi5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9HdWkuanMiLCJhcHAvanMvc3JjL2Rpc3BsYXkvSGVyby5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9JY29uQnRuLmpzIiwiYXBwL2pzL3NyYy9kaXNwbGF5L1NoYWRvd092ZXJsYXkuanMiLCJhcHAvanMvc3JjL2Rpc3BsYXkvU3Bpa2UuanMiLCJhcHAvanMvc3JjL21hbmFnZXJzL2Fzc2V0c01hbmFnZXIuanMiLCJhcHAvanMvc3JjL21hbmFnZXJzL2RhdGFNYW5hZ2VyLmpzIiwiYXBwL2pzL3NyYy9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlci5qcyIsImFwcC9qcy9zcmMvbWFuYWdlcnMvc2VydmVyTWFuYWdlci5qcyIsImFwcC9qcy9zcmMvbWFuYWdlcnMvc291bmRNYW5hZ2VyLmpzIiwiYXBwL2pzL3NyYy9zY3JlZW5zL0VuZFNjcmVlbi5qcyIsImFwcC9qcy9zcmMvc2NyZWVucy9NYWluU2NyZWVuLmpzIiwiYXBwL2pzL3NyYy9zY3JlZW5zL1BWUFNjcmVlbi5qcyIsImFwcC9qcy9zcmMvc2NyZWVucy9SYXRpbmdTY3JlZW4uanMiLCJhcHAvanMvc3JjL3NjcmVlbnMvU3RhcnRTY3JlZW4uanMiLCJub2RlX21vZHVsZXMvcmFuZG9tLWludC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsUUFBUSxHQUFSLENBQVksQ0FDVix3QkFBYyxJQUFkLEVBRFUsRUFFVix3QkFBYyxJQUFkLEVBRlUsQ0FBWixFQUlHLElBSkgsQ0FJUTtBQUFBLFNBQU0sUUFBUSxHQUFSLENBQVksQ0FDdEIsd0JBQWMsT0FBZCxHQUF3QixJQUF4QixDQUE2QjtBQUFBLFdBQVEsc0JBQVksR0FBWixDQUFnQixNQUFoQixFQUF3QjtBQUMzRCxVQUFJLEtBQUssRUFEa0Q7QUFFM0QsWUFBUyxLQUFLLFVBQWQsU0FBNEIsS0FBSyxTQUYwQjtBQUczRCxXQUFLLEtBQUs7QUFIaUQsS0FBeEIsQ0FBUjtBQUFBLEdBQTdCLENBRHNCLEVBTXRCLHdCQUFjLEdBQWQsQ0FBa0IsVUFBbEIsRUFBOEIsSUFBOUIsQ0FBbUM7QUFBQSxXQUFLLHNCQUFZLEdBQVosQ0FBZ0IsVUFBaEIsRUFBNEIsQ0FBQyxDQUE3QixDQUFMO0FBQUEsR0FBbkMsQ0FOc0IsRUFPdEIsd0JBQWMsR0FBZCxDQUFrQixPQUFsQixFQUEyQixJQUEzQixDQUFnQztBQUFBLFdBQUssdUJBQWEsSUFBYixDQUFrQixNQUFNLEVBQU4sR0FBVyxJQUFYLEdBQWtCLENBQUMsQ0FBQyxDQUF0QyxDQUFMO0FBQUEsR0FBaEMsQ0FQc0IsQ0FBWixDQUFOO0FBQUEsQ0FKUixFQWFHLElBYkgsQ0FhUTtBQUFBLFNBQU0seUJBQWUsTUFBZixDQUFzQixhQUF0QixDQUFOO0FBQUEsQ0FiUixFQWNHLEtBZEgsQ0FjUztBQUFBLFNBQUssUUFBUSxLQUFSLENBQWMseUJBQWQsRUFBeUMsQ0FBekMsQ0FBTDtBQUFBLENBZFQ7O0FBZ0JBLElBQU0sUUFBUSxJQUFJLFNBQVMsS0FBYixDQUFtQixZQUFuQixDQUFkO0FBQ0EseUJBQWUsSUFBZixDQUFvQixLQUFwQjs7QUFFQSxJQUFJLFNBQVMsS0FBVCxDQUFlLFdBQWYsRUFBSixFQUFrQztBQUNoQyxXQUFTLEtBQVQsQ0FBZSxNQUFmLENBQXNCLEtBQXRCLEVBQTZCLElBQTdCO0FBQ0QsQ0FGRCxNQUVPO0FBQ0wsUUFBTSxlQUFOLENBQXNCLEVBQXRCO0FBQ0Q7O0FBRUQsSUFBSSxXQUFXLE9BQU8sTUFBdEIsRUFBOEI7QUFDNUI7QUFDQSxTQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDO0FBQUEsV0FBTSxPQUFPLEtBQVAsRUFBTjtBQUFBLEdBQWpDO0FBQ0Q7Ozs7Ozs7Ozs7O0FDbENEOzs7Ozs7Ozs7Ozs7SUFFcUIsVTs7O0FBQ25CLHNCQUFZLElBQVosRUFBa0IsV0FBbEIsRUFBK0I7QUFBQTs7QUFBQTs7QUFHN0IsVUFBSyxHQUFMLEdBQVcsd0JBQWMsU0FBZCxDQUF3QixJQUF4QixDQUFYO0FBQ0EsUUFBTSxRQUFRLE1BQUssR0FBTCxDQUFTLEtBQVQsR0FBaUIsV0FBL0I7O0FBRUEsVUFBSyxRQUFMLENBQWMsZUFBZCxDQUE4QixNQUFLLEdBQW5DLEVBQXdDLFVBQXhDLEVBQW9ELFFBQXBELENBQTZELENBQTdELEVBQWdFLENBQWhFLEVBQW1FLEtBQW5FLEVBQTBFLE1BQUssR0FBTCxDQUFTLE1BQW5GO0FBQ0EsVUFBSyxJQUFMLEdBQVksTUFBSyxHQUFMLENBQVMsTUFBckI7QUFDQSxVQUFLLEtBQUwsQ0FBVyxDQUFYLEVBQWMsQ0FBZCxFQUFpQixLQUFqQixFQUF3QixNQUFLLEdBQUwsQ0FBUyxNQUFqQztBQVI2QjtBQVM5Qjs7Ozt5QkFDSSxJLEVBQU07QUFDVCxXQUFLLENBQUwsSUFBVSxJQUFWO0FBQ0EsV0FBSyxDQUFMLElBQVUsS0FBSyxHQUFMLENBQVMsS0FBbkI7QUFDRDs7OztFQWRxQyxTQUFTLEs7O2tCQUE1QixVOzs7Ozs7Ozs7OztBQ0ZyQjs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUIsRzs7O0FBQ25CLGVBQVksS0FBWixFQUFrRDtBQUFBLFFBQS9CLEtBQStCLHVFQUF2QixPQUF1QjtBQUFBLFFBQWQsSUFBYyx1RUFBUCxLQUFPOztBQUFBOztBQUFBOztBQUdoRCxVQUFLLEtBQUwsR0FBYSxLQUFiOztBQUVBLFVBQUssUUFBTCxDQUFjLElBQWQ7QUFDQSxVQUFLLFdBQUwsQ0FBaUIsS0FBakI7O0FBRUEsVUFBSyxnQkFBTCxDQUFzQixPQUF0QixFQUErQjtBQUFBLGFBQU0sdUJBQWEsSUFBYixDQUFrQixNQUFsQixDQUFOO0FBQUEsS0FBL0I7QUFSZ0Q7QUFTakQ7Ozs7NkJBQ1EsSSxFQUFNO0FBQ2IsV0FBSyxFQUFMLEdBQVUsSUFBSSxTQUFTLE1BQWIsQ0FBb0Isd0JBQWMsY0FBZCxDQUE2QixJQUE3QixDQUFwQixDQUFWO0FBQ0EsV0FBSyxFQUFMLENBQVEsSUFBUixHQUFlLEtBQUssRUFBTCxDQUFRLFNBQVIsR0FBb0IsS0FBcEIsR0FBNEIsQ0FBM0M7QUFDQSxXQUFLLEVBQUwsQ0FBUSxJQUFSLEdBQWUsS0FBSyxFQUFMLENBQVEsU0FBUixHQUFvQixNQUFwQixHQUE2QixDQUE1QztBQUNBLFdBQUssTUFBTCxHQUFjLElBQUksU0FBUyxZQUFiLENBQTBCLEtBQUssRUFBL0IsRUFBc0MsS0FBSyxLQUEzQyxVQUEwRCxLQUFLLEtBQS9ELFdBQStFLEtBQUssS0FBcEYsVUFBZDtBQUNBLFdBQUssUUFBTCxDQUFjLEtBQUssRUFBbkI7QUFDRDs7O2dDQUNXLEssRUFBTztBQUNqQixXQUFLLEtBQUwsR0FBYSxJQUFJLFNBQVMsSUFBYixDQUFrQixLQUFsQixFQUF5QixlQUF6QixFQUEwQyxNQUExQyxDQUFiO0FBQ0EsV0FBSyxLQUFMLENBQVcsTUFBWCxHQUFvQixJQUFJLFNBQVMsTUFBYixDQUFvQixNQUFwQixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxDQUFwQjtBQUNBLFdBQUssS0FBTCxDQUFXLFNBQVgsR0FBdUIsUUFBdkI7QUFDQSxXQUFLLEtBQUwsQ0FBVyxZQUFYLEdBQTBCLFFBQTFCO0FBQ0EsV0FBSyxLQUFMLENBQVcsWUFBWCxHQUEwQixLQUExQjtBQUNBLFdBQUssS0FBTCxDQUFXLENBQVgsR0FBZSxDQUFDLENBQWhCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBSyxRQUFMLENBQWMsS0FBSyxLQUFuQjtBQUNEOzs7OEJBQ1M7QUFDUixXQUFLLEVBQUwsQ0FBUSxXQUFSLENBQW9CLFNBQXBCO0FBQ0EsV0FBSyxZQUFMLEdBQW9CLEtBQXBCO0FBQ0Q7Ozs2QkFDUTtBQUNQLFdBQUssRUFBTCxDQUFRLFdBQVIsQ0FBdUIsS0FBSyxLQUE1QjtBQUNBLFdBQUssWUFBTCxHQUFvQixJQUFwQjtBQUNEOzs7O0VBekM4QixTQUFTLFM7O2tCQUFyQixHOzs7Ozs7Ozs7QUNIckI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQixHOzs7QUFDbkIsZUFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7O0FBR2pCLFVBQUssS0FBTCxHQUFhLEtBQWI7O0FBRUEsVUFBSyxPQUFMLEdBQWUsc0JBQVksTUFBWixDQUFmO0FBQ0EsVUFBSyxPQUFMLENBQWEsQ0FBYixHQUFpQixNQUFLLE9BQUwsQ0FBYSxTQUFiLEdBQXlCLEtBQXpCLEdBQWlDLENBQWpDLEdBQXFDLEVBQXREO0FBQ0EsVUFBSyxPQUFMLENBQWEsQ0FBYixHQUFpQixNQUFLLE9BQUwsQ0FBYSxTQUFiLEdBQXlCLE1BQXpCLEdBQWtDLENBQWxDLEdBQXNDLEVBQXZEOztBQUVBLFVBQUssU0FBTCxHQUFpQixzQkFBWSxRQUFaLENBQWpCO0FBQ0EsVUFBSyxTQUFMLENBQWUsQ0FBZixHQUFtQixNQUFLLFNBQUwsQ0FBZSxTQUFmLEdBQTJCLEtBQTNCLEdBQW1DLENBQW5DLEdBQXVDLENBQXZDLEdBQTJDLEVBQTlEO0FBQ0EsVUFBSyxTQUFMLENBQWUsQ0FBZixHQUFtQixNQUFLLFNBQUwsQ0FBZSxTQUFmLEdBQTJCLE1BQTNCLEdBQW9DLENBQXBDLEdBQXdDLEVBQTNEOztBQUVBLFVBQUssUUFBTCxHQUFnQixzQkFBWSx1QkFBYSxTQUFiLEtBQTJCLE9BQTNCLEdBQXFDLFVBQWpELENBQWhCO0FBQ0EsVUFBSyxRQUFMLENBQWMsQ0FBZCxHQUFrQixNQUFLLEtBQUwsR0FBYSxNQUFLLFFBQUwsQ0FBYyxTQUFkLEdBQTBCLEtBQTFCLEdBQWtDLENBQS9DLEdBQW1ELEVBQXJFO0FBQ0EsVUFBSyxRQUFMLENBQWMsQ0FBZCxHQUFrQixNQUFLLFFBQUwsQ0FBYyxTQUFkLEdBQTBCLE1BQTFCLEdBQW1DLENBQW5DLEdBQXVDLEVBQXpEOztBQUVBO0FBQ0EsVUFBSyxTQUFMLENBQWUsS0FBZixDQUFxQixDQUFyQixHQUF5QixNQUFLLFFBQUwsQ0FBYyxLQUFkLENBQW9CLENBQXBCLEdBQXdCLENBQWpEOztBQUVBLFVBQUssUUFBTCxDQUFjLE1BQUssT0FBbkIsRUFBNEIsTUFBSyxTQUFqQyxFQUE0QyxNQUFLLFFBQWpEOztBQUVBLFVBQUssUUFBTCxDQUFjLGdCQUFkLENBQStCLE9BQS9CLEVBQXdDLFlBQU07QUFDNUMsNkJBQWEsTUFBYjtBQUNBLFlBQUssUUFBTCxDQUFjLFdBQWQsQ0FBMEIsdUJBQWEsU0FBYixLQUEyQixPQUEzQixHQUFxQyxVQUEvRDtBQUNBLDhCQUFjLEdBQWQsQ0FBa0IsT0FBbEIsRUFBMkIsdUJBQWEsU0FBYixFQUEzQjtBQUNELEtBSkQ7O0FBTUEsVUFBSyxPQUFMLENBQWEsZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUM7QUFBQSxhQUFNLHlCQUFjLE1BQWQsQ0FBcUIsYUFBckIsQ0FBTjtBQUFBLEtBQXZDO0FBQ0EsVUFBSyxTQUFMLENBQWUsZ0JBQWYsQ0FBZ0MsT0FBaEMsRUFBeUM7QUFBQSxhQUFNLHlCQUFjLE1BQWQsQ0FBcUIsY0FBckIsQ0FBTjtBQUFBLEtBQXpDO0FBN0JpQjtBQThCbEI7OztFQS9COEIsU0FBUyxTOztrQkFBckIsRzs7Ozs7Ozs7Ozs7QUNMckI7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTSxTQUFTO0FBQ2IsS0FBRyxJQURVO0FBRWIsS0FBRztBQUZVLENBQWY7O0lBS3FCLEk7OztBQUNuQixnQkFBWSxJQUFaLEVBQWtCO0FBQUE7O0FBQUEsNEdBQ1Ysd0JBQWMsY0FBZCxDQUE2QixJQUE3QixDQURVOztBQUdoQixVQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0EsVUFBSyxNQUFMLEdBQWMsTUFBSyxTQUFMLEVBQWQ7QUFDQSxVQUFLLElBQUwsR0FBWSxNQUFLLE1BQUwsQ0FBWSxLQUFaLEdBQW9CLENBQWhDO0FBQ0EsVUFBSyxJQUFMLEdBQVksTUFBSyxNQUFMLENBQVksTUFBWixHQUFxQixDQUFqQzs7QUFFQSxVQUFLLElBQUwsR0FBWSxLQUFaO0FBQ0EsVUFBSyxFQUFMLEdBQVUsQ0FBVjtBQVRnQjtBQVVqQjs7OzsyQkFDTTtBQUNMLFVBQUksS0FBSyxJQUFULEVBQWU7QUFDYjtBQUNEO0FBQ0QsV0FBSyxFQUFMLEdBQVUsS0FBSyxHQUFMLENBQVMsS0FBSyxFQUFMLEdBQVUsT0FBTyxDQUExQixFQUE2QixDQUFDLE9BQU8sQ0FBckMsQ0FBVjtBQUNBLFdBQUssV0FBTCxDQUFpQixNQUFqQjtBQUNBLDZCQUFhLElBQWIsQ0FBa0IsTUFBbEI7QUFDRDs7OzJCQUNNO0FBQ0wsV0FBSyxFQUFMLElBQVcsT0FBTyxDQUFsQjtBQUNBLFdBQUssQ0FBTCxJQUFVLEtBQUssRUFBZjtBQUNEOzs7MEJBQ0s7QUFDSixVQUFJLEtBQUssSUFBVCxFQUFlO0FBQ2I7QUFDRDtBQUNELFdBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxXQUFLLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxXQUFLLFdBQUwsQ0FBaUIsTUFBakI7QUFDQSw2QkFBYSxJQUFiLENBQWtCLE9BQWxCO0FBQ0Q7Ozs7RUFoQytCLFNBQVMsTTs7a0JBQXRCLEk7Ozs7Ozs7Ozs7O0FDUnJCOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQixPOzs7QUFDbkIsbUJBQVksS0FBWixFQUFxQztBQUFBLFFBQWxCLEtBQWtCLHVFQUFWLFFBQVU7O0FBQUE7O0FBQUEsNkdBQzdCLEtBRDZCLEVBQ3RCLEtBRHNCLEVBQ2YsU0FEZTtBQUVwQzs7OztnQ0FDVyxLLEVBQU87QUFDakIsV0FBSyxLQUFMLEdBQWEsSUFBSSxTQUFTLE1BQWIsQ0FBb0Isd0JBQWMsY0FBZCxDQUE2QixNQUE3QixDQUFwQixFQUEwRCxLQUExRCxDQUFiO0FBQ0EsV0FBSyxLQUFMLENBQVcsSUFBWCxHQUFrQixLQUFLLEtBQUwsQ0FBVyxTQUFYLEdBQXVCLEtBQXZCLEdBQStCLENBQWpEO0FBQ0EsV0FBSyxLQUFMLENBQVcsSUFBWCxHQUFrQixLQUFLLEtBQUwsQ0FBVyxTQUFYLEdBQXVCLE1BQXZCLEdBQWdDLENBQWxEO0FBQ0EsV0FBSyxLQUFMLENBQVcsWUFBWCxHQUEwQixLQUExQjtBQUNBLFdBQUssUUFBTCxDQUFjLEtBQUssS0FBbkI7QUFDRDs7O2dDQUNXLEssRUFBTztBQUNqQixXQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEtBQXZCO0FBQ0Q7Ozs7OztrQkFia0IsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNIQSxhOzs7QUFDbkIseUJBQVksS0FBWixFQUFtQixNQUFuQixFQUEyQjtBQUFBOztBQUFBOztBQUd6QixVQUFLLE1BQUwsR0FBYyxJQUFJLFNBQVMsS0FBYixFQUFkO0FBQ0EsVUFBSyxNQUFMLENBQVksUUFBWixDQUFxQixTQUFyQixDQUErQixvQkFBL0IsRUFBcUQsUUFBckQsQ0FBOEQsQ0FBOUQsRUFBaUUsQ0FBakUsRUFBb0UsS0FBcEUsRUFBMkUsTUFBM0U7O0FBRUEsVUFBSyxVQUFMLEdBQWtCLElBQUksU0FBUyxJQUFiLENBQWtCLEVBQWxCLEVBQXNCLGVBQXRCLEVBQXVDLE1BQXZDLENBQWxCO0FBQ0EsVUFBSyxVQUFMLENBQWdCLENBQWhCLEdBQW9CLFNBQVMsQ0FBN0I7QUFDQSxVQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsR0FBb0IsUUFBUSxDQUE1QjtBQUNBLFVBQUssVUFBTCxDQUFnQixTQUFoQixHQUE0QixRQUE1QjtBQUNBLFVBQUssVUFBTCxDQUFnQixZQUFoQixHQUErQixRQUEvQjs7QUFFQSxVQUFLLFFBQUwsQ0FBYyxNQUFLLE1BQW5CLEVBQTJCLE1BQUssVUFBaEM7QUFDQTtBQUNBO0FBZHlCO0FBZTFCOzs7OzRCQUNPLEksRUFBTTtBQUNaLFdBQUssVUFBTCxDQUFnQixJQUFoQixHQUF1QixJQUF2QjtBQUNBO0FBQ0Q7Ozs7RUFwQndDLFNBQVMsUzs7a0JBQS9CLGE7Ozs7Ozs7OztBQ0FyQjs7Ozs7Ozs7Ozs7O0lBRXFCLEs7OztBQUNuQixtQkFBYztBQUFBOztBQUFBLDhHQUNOLHdCQUFjLFNBQWQsQ0FBd0IsT0FBeEIsQ0FETTs7QUFHWixVQUFLLE1BQUwsR0FBYyxNQUFLLFNBQUwsRUFBZDtBQUNBLFVBQUssSUFBTCxHQUFZLE1BQUssTUFBTCxDQUFZLEtBQVosR0FBb0IsQ0FBaEM7QUFDQSxVQUFLLElBQUwsR0FBWSxNQUFLLE1BQUwsQ0FBWSxNQUF4QjtBQUxZO0FBTWI7OztFQVBnQyxTQUFTLE07O2tCQUF2QixLOzs7Ozs7OztBQ0ZyQixJQUFNLFdBQVcsQ0FDZixFQUFFLElBQUksU0FBTixFQUFpQixLQUFLLHdCQUF0QixFQURlO0FBRWY7QUFDQTtBQUNBLEVBQUUsSUFBSSxPQUFOLEVBQWUsS0FBSyxlQUFwQixFQUplLEVBS2YsRUFBRSxJQUFJLEtBQU4sRUFBYSxLQUFLLGdCQUFsQixFQUxlLEVBTWYsRUFBRSxJQUFJLE9BQU4sRUFBZSxLQUFLLGtCQUFwQixFQU5lLEVBT2YsRUFBRSxJQUFJLFVBQU4sRUFBa0IsS0FBSyxxQkFBdkIsRUFQZSxFQVFmLEVBQUUsSUFBSSxRQUFOLEVBQWdCLEtBQUssbUJBQXJCLEVBUmUsRUFTZixFQUFFLElBQUksS0FBTixFQUFhLEtBQUssb0JBQWxCLEVBVGUsRUFVZixFQUFFLElBQUksVUFBTixFQUFrQixLQUFLLHlCQUF2QixFQVZlLEVBV2YsRUFBRSxJQUFJLE1BQU4sRUFBYyxLQUFLLHFCQUFuQixFQVhlLEVBWWYsRUFBRSxJQUFJLE1BQU4sRUFBYyxLQUFLLHNCQUFuQixFQVplLEVBYWYsRUFBRSxJQUFJLE1BQU4sRUFBYyxLQUFLLGdCQUFuQixFQWJlLEVBY2YsRUFBRSxJQUFJLE9BQU4sRUFBZSxLQUFLLGlCQUFwQixFQWRlLENBQWpCOztBQWlCQSxJQUFNLHlCQUF5QixTQUF6QixzQkFBeUI7QUFBQSxTQUFTO0FBQ3RDLFlBQVEsQ0FBQyxJQUFELENBRDhCO0FBRXRDLFlBQVEsRUFBRSxPQUFPLEdBQVQsRUFBYyxRQUFRLEVBQXRCLEVBRjhCO0FBR3RDLGdCQUFZO0FBQ1YsV0FBSyxDQURLO0FBRVYsWUFBTSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sS0FBUCxDQUZJO0FBR1YsWUFBTTtBQUhJO0FBSDBCLEdBQVQ7QUFBQSxDQUEvQjs7QUFVQSxJQUFNLG1CQUFtQjtBQUN2QixRQUFNLHVCQUF1QixNQUF2QixDQURpQjtBQUV2QixXQUFTLHVCQUF1QixTQUF2QixDQUZjO0FBR3ZCLFdBQVMsdUJBQXVCLFNBQXZCLENBSGM7QUFJdkIsT0FBSztBQUNILFlBQVEsQ0FBQyxLQUFELENBREw7QUFFSCxZQUFRLEVBQUUsT0FBTyxHQUFULEVBQWMsUUFBUSxFQUF0QixFQUEwQixTQUFTLENBQW5DLEVBRkw7QUFHSCxnQkFBWTtBQUNWLGdCQUFVLENBREE7QUFFVixpQkFBVyxDQUZEO0FBR1YsaUJBQVcsQ0FIRDtBQUlWLGlCQUFXLENBSkQ7QUFLVixrQkFBWSxDQUxGO0FBTVYsa0JBQVksQ0FORjtBQU9WLGNBQVEsQ0FQRTtBQVFWLGVBQVMsQ0FSQztBQVNWLGVBQVMsQ0FUQztBQVVWLGVBQVM7QUFWQztBQUhULEdBSmtCO0FBb0J2QixXQUFTO0FBQ1AsWUFBUSxDQUFDLFVBQUQsQ0FERDtBQUVQLFlBQVEsRUFBRSxPQUFPLEVBQVQsRUFBYSxRQUFRLEVBQXJCLEVBQXlCLFNBQVMsQ0FBbEMsRUFGRDtBQUdQLGdCQUFZO0FBQ1YsZ0JBQVUsQ0FEQTtBQUVWLGlCQUFXLENBRkQ7QUFHVixpQkFBVyxDQUhEO0FBSVYsaUJBQVcsQ0FKRDtBQUtWLGtCQUFZLENBTEY7QUFNVixrQkFBWSxDQU5GO0FBT1YsY0FBUSxDQVBFO0FBUVYsZUFBUyxDQVJDO0FBU1YsZUFBUyxDQVRDO0FBVVYsZUFBUztBQVZDO0FBSEwsR0FwQmM7QUFvQ3ZCLFFBQU07QUFDSixZQUFRLENBQUMsTUFBRCxDQURKO0FBRUosWUFBUSxFQUFFLE9BQU8sRUFBVCxFQUFhLFFBQVEsRUFBckIsRUFGSjtBQUdKLGdCQUFZO0FBQ1YsYUFBTyxDQURHO0FBRVYsZ0JBQVUsQ0FGQTtBQUdWLGNBQVEsQ0FIRTtBQUlWLFlBQU07QUFKSTtBQUhSO0FBcENpQixDQUF6Qjs7QUFnREEsSUFBTSxlQUFlLEVBQXJCOztBQUVBLElBQU0sZ0JBQWdCO0FBQ3BCLE1BRG9CLGtCQUNiO0FBQUE7O0FBQ0wsYUFBUyxLQUFULENBQWUsbUJBQWYsR0FBcUMsQ0FBQyxLQUFELENBQXJDO0FBQ0EsU0FBSyxLQUFMLEdBQWEsSUFBSSxTQUFTLFNBQWIsRUFBYjtBQUNBLFNBQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsU0FBUyxLQUFsQztBQUNBLFNBQUssS0FBTCxDQUFXLFlBQVgsQ0FBd0IsUUFBeEI7O0FBRUEsV0FBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQ3RDLFlBQUssS0FBTCxDQUFXLGdCQUFYLENBQTRCLFVBQTVCLEVBQXdDO0FBQUEsZUFBTSxTQUFOO0FBQUEsT0FBeEM7QUFDQSxZQUFLLEtBQUwsQ0FBVyxnQkFBWCxDQUE0QixPQUE1QixFQUFxQztBQUFBLGVBQU0sUUFBTjtBQUFBLE9BQXJDO0FBQ0QsS0FITSxDQUFQO0FBSUQsR0FYbUI7QUFZcEIsV0Fab0IscUJBWVYsSUFaVSxFQVlKO0FBQ2QsV0FBTyxLQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLElBQXJCLENBQVA7QUFDRCxHQWRtQjtBQWVwQixnQkFmb0IsMEJBZUwsSUFmSyxFQWVDO0FBQUE7O0FBQ25CLFFBQUksQ0FBQyxhQUFhLElBQWIsQ0FBTCxFQUF5QjtBQUN2QixVQUFNLE9BQU8saUJBQWlCLElBQWpCLENBQWI7O0FBRUEsVUFBSSxDQUFDLElBQUwsRUFBVztBQUNULGNBQU0sSUFBSSxLQUFKLENBQVUsMEJBQVYsQ0FBTjtBQUNEOztBQUVELFdBQUssTUFBTCxHQUFjLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0I7QUFBQSxlQUFPLE9BQUssU0FBTCxDQUFlLEdBQWYsQ0FBUDtBQUFBLE9BQWhCLENBQWQ7QUFDQSxtQkFBYSxJQUFiLElBQXFCLElBQUksU0FBUyxXQUFiLENBQXlCLElBQXpCLENBQXJCO0FBQ0Q7O0FBRUQsV0FBTyxhQUFhLElBQWIsQ0FBUDtBQUNEO0FBNUJtQixDQUF0Qjs7a0JBK0JlLGE7Ozs7Ozs7O0FDNUdmLElBQU0sY0FBYztBQUNsQixZQUFVLElBRFE7QUFFbEIsWUFBVSxJQUZRO0FBR2xCLFNBQU8sSUFIVztBQUlsQixZQUFVLElBSlE7QUFLbEIsWUFBVSxTQUxRO0FBTWxCLE9BQUssSUFOYTtBQU9sQixPQUFLLElBUGE7QUFRbEIsVUFBUSxJQVJVO0FBU2xCLFdBQVMsSUFUUztBQVVsQixRQUFNO0FBQ0osUUFBSSxJQURBO0FBRUosVUFBTSxJQUZGO0FBR0osU0FBSztBQUhELEdBVlk7QUFlbEIsU0FBTyxJQWZXO0FBZ0JsQixVQUFRO0FBQ04sWUFBUSxDQUFDLENBQUMsQ0FBRCxFQUFJLEVBQUosQ0FBRCxFQUFVLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBVixDQURGO0FBRU4sZ0JBQVksQ0FBQyxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQUQsRUFBYSxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQWIsQ0FGTjtBQUdOLGNBQVUsQ0FBQyxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQUQsRUFBYSxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQWIsQ0FISjtBQUlOLFVBQU0sQ0FBQyxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQUQsRUFBYSxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQWIsQ0FKQTtBQUtOLFVBQU0sQ0FBQyxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQUQsRUFBYSxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQWIsQ0FMQTtBQU1OLGdCQUFZLENBQUMsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFELEVBQWEsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFiLENBTk47QUFPTixTQUFLLENBQUMsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFELEVBQWEsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFiO0FBUEMsR0FoQlU7QUF5QmxCLEtBekJrQixlQXlCZCxHQXpCYyxFQXlCVCxLQXpCUyxFQXlCRjtBQUNkLFNBQUssR0FBTCxJQUFZLEtBQVo7QUFDRDtBQTNCaUIsQ0FBcEI7O2tCQThCZSxXOzs7Ozs7Ozs7QUM5QmY7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTSxnQkFBZ0I7QUFDcEIsTUFEb0IsZ0JBQ2YsS0FEZSxFQUNSO0FBQUE7O0FBQ1YsU0FBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLFNBQUssYUFBTCxHQUFxQixJQUFyQjtBQUNBLFNBQUssT0FBTCxHQUFlO0FBQ2Isd0NBRGE7QUFFYixzQ0FGYTtBQUdiLG9DQUhhO0FBSWIsb0NBSmE7QUFLYjtBQUxhLEtBQWY7O0FBUUEsYUFBUyxNQUFULENBQWdCLFVBQWhCLEdBQTZCLFNBQVMsTUFBVCxDQUFnQixHQUE3QztBQUNBLGFBQVMsTUFBVCxDQUFnQixnQkFBaEIsQ0FBaUMsTUFBakMsRUFBeUMsYUFBSztBQUM1QyxVQUFJLE1BQUssYUFBTCxJQUFzQixNQUFLLGFBQUwsQ0FBbUIsSUFBN0MsRUFBbUQ7QUFDakQsY0FBSyxhQUFMLENBQW1CLElBQW5CLENBQXdCLENBQXhCO0FBQ0Q7QUFDRCxZQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLENBQWxCO0FBQ0QsS0FMRDtBQU1ELEdBbkJtQjtBQW9CcEIsUUFwQm9CLGtCQW9CYixJQXBCYSxFQW9CUDtBQUNYLFFBQUksS0FBSyxhQUFULEVBQXdCO0FBQ3RCLFVBQUksS0FBSyxhQUFMLENBQW1CLE9BQXZCLEVBQWdDO0FBQzlCLGFBQUssYUFBTCxDQUFtQixPQUFuQjtBQUNEO0FBQ0QsV0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixLQUFLLGFBQTVCO0FBQ0Q7QUFDRCxTQUFLLGFBQUwsR0FBcUIsSUFBSSxLQUFLLE9BQUwsQ0FBYSxJQUFiLENBQUosQ0FBdUIsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixLQUF6QyxFQUFnRCxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLE1BQWxFLENBQXJCO0FBQ0EsU0FBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixLQUFLLGFBQXpCO0FBQ0Q7QUE3Qm1CLENBQXRCOztrQkFnQ2UsYTs7Ozs7Ozs7QUN0Q2YsSUFBTSxnQkFBZ0I7QUFDcEIsTUFEb0Isa0JBQ2I7QUFDTCxXQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVY7QUFBQSxhQUFxQixHQUFHLElBQUgsQ0FDdEM7QUFBQSxlQUFNLFNBQU47QUFBQSxPQURzQyxFQUV0QztBQUFBLGVBQUssT0FBTyxlQUFQLEVBQXdCLENBQXhCLENBQUw7QUFBQSxPQUZzQyxFQUd4QyxNQUh3QyxDQUFyQjtBQUFBLEtBQVosQ0FBUDtBQUlELEdBTm1CO0FBT3BCLFNBUG9CLHFCQU9WO0FBQ1IsV0FBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQ3RDLFNBQUcsR0FBSCxDQUFPLFdBQVAsRUFBb0IsRUFBRSxRQUFRLEtBQVYsRUFBcEIsRUFBdUMsYUFBSztBQUMxQyxZQUFJLEVBQUUsS0FBTixFQUFhO0FBQ1gsaUJBQU8sRUFBRSxLQUFUO0FBQ0E7QUFDRDtBQUNELGdCQUFRLEVBQUUsUUFBRixDQUFXLENBQVgsQ0FBUjtBQUNELE9BTkQ7QUFPRCxLQVJNLENBQVA7QUFTRCxHQWpCbUI7QUFrQnBCLEtBbEJvQixlQWtCaEIsR0FsQmdCLEVBa0JDO0FBQUEsUUFBWixNQUFZLHVFQUFILENBQUc7O0FBQ25CLFdBQU8sSUFBSSxPQUFKLENBQVk7QUFBQSxhQUFXLEdBQUcsR0FBSCxDQUFPLGFBQVAsRUFBc0IsRUFBRSxRQUFGLEVBQU8sY0FBUCxFQUF0QixFQUF1QyxPQUF2QyxDQUFYO0FBQUEsS0FBWixFQUNKLElBREksQ0FDQyxhQUFLO0FBQ1QsVUFBSSxFQUFFLEtBQU4sRUFBYTtBQUNYLGNBQU0sSUFBSSxLQUFKLENBQVUsRUFBRSxLQUFaLENBQU47QUFDRCxPQUZELE1BRU8sSUFBSSxFQUFFLFFBQUYsS0FBZSxFQUFuQixFQUF1QjtBQUM1QjtBQUNBLGVBQU8sRUFBUDtBQUNEO0FBQ0QsYUFBTyxLQUFLLEtBQUwsQ0FBVyxFQUFFLFFBQWIsQ0FBUDtBQUNELEtBVEksQ0FBUDtBQVVELEdBN0JtQjtBQThCcEIsS0E5Qm9CLGVBOEJoQixHQTlCZ0IsRUE4QlgsS0E5QlcsRUE4QlE7QUFBQSxRQUFaLE1BQVksdUVBQUgsQ0FBRzs7QUFDMUIsT0FBRyxHQUFILENBQU8sYUFBUCxFQUFzQixFQUFFLFFBQUYsRUFBTyxPQUFPLEtBQUssU0FBTCxDQUFlLEtBQWYsQ0FBZCxFQUFxQyxjQUFyQyxFQUF0QjtBQUNELEdBaENtQjtBQWlDcEIsT0FqQ29CLGlCQWlDZCxPQWpDYyxFQWlDTCxLQWpDSyxFQWlDRTtBQUNwQixRQUFNLFNBQVM7QUFDYixjQUFRLDJCQURLO0FBRWIsV0FBSztBQUZRLEtBQWY7QUFJQSxPQUFHLEdBQUgsQ0FBTyxXQUFQLEVBQW9CO0FBQ2xCLGVBQVMsT0FEUztBQUVsQixtQkFBZ0IsT0FBTyxLQUFQLENBQWhCLGdDQUZrQjtBQUdsQixnQkFBVTtBQUhRLEtBQXBCO0FBS0QsR0EzQ21CO0FBNENwQixRQTVDb0Isb0JBNENYO0FBQ1AsT0FBRyxVQUFILENBQWMsZUFBZDtBQUNEO0FBOUNtQixDQUF0Qjs7a0JBaURlLGE7Ozs7Ozs7O0FDakRmLElBQU0sZUFBZTtBQUNuQixNQURtQixnQkFDZCxNQURjLEVBQ047QUFDWCxTQUFLLE9BQUwsR0FBZSxNQUFmO0FBQ0EsU0FBSyxFQUFMLEdBQVUsU0FBUyxLQUFULENBQWUsSUFBZixDQUFvQixNQUFwQixFQUE0QixFQUFFLE1BQU0sQ0FBQyxDQUFULEVBQVksUUFBUSxHQUFwQixFQUE1QixDQUFWO0FBQ0EsU0FBSyxFQUFMLENBQVEsTUFBUixHQUFpQixDQUFDLEtBQUssT0FBdkI7QUFDQTtBQUNBLFNBQUssRUFBTCxDQUFRLFFBQVIsR0FBbUIsQ0FBbkI7QUFDRCxHQVBrQjtBQVFuQixRQVJtQixvQkFRVjtBQUNQLFNBQUssT0FBTCxHQUFlLENBQUMsS0FBSyxPQUFyQjtBQUNBLFNBQUssRUFBTCxDQUFRLE1BQVIsR0FBaUIsQ0FBQyxLQUFLLE9BQXZCO0FBQ0QsR0FYa0I7QUFZbkIsV0FabUIsdUJBWVA7QUFDVixXQUFPLEtBQUssT0FBWjtBQUNELEdBZGtCO0FBZW5CLE1BZm1CLGdCQWVkLEtBZmMsRUFlUDtBQUNWLFFBQUksS0FBSyxPQUFULEVBQWtCO0FBQ2hCLGVBQVMsS0FBVCxDQUFlLElBQWYsQ0FBb0IsS0FBcEI7QUFDRDtBQUNGO0FBbkJrQixDQUFyQjs7a0JBc0JlLFk7Ozs7Ozs7Ozs7O0FDdEJmOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUIsUzs7O0FBQ25CLHFCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFHakIsVUFBSyxFQUFMLEdBQVUsSUFBSSxTQUFTLE1BQWIsQ0FBb0Isd0JBQWMsU0FBZCxDQUF3QixPQUF4QixDQUFwQixDQUFWO0FBQ0EsVUFBSyxHQUFMLEdBQVcsa0JBQVEsS0FBUixDQUFYOztBQUVBLFVBQUssUUFBTCxHQUFnQixJQUFJLFNBQVMsSUFBYiw0Q0FBNkIsc0JBQVksUUFBekMsY0FBdUQsZUFBdkQsRUFBd0UsTUFBeEUsQ0FBaEI7QUFDQSxVQUFLLFFBQUwsQ0FBYyxTQUFkLEdBQTBCLFFBQTFCO0FBQ0EsVUFBSyxRQUFMLENBQWMsQ0FBZCxHQUFrQixRQUFRLENBQTFCO0FBQ0EsVUFBSyxRQUFMLENBQWMsQ0FBZCxHQUFrQixFQUFsQjs7QUFFQSxVQUFLLEtBQUwsR0FBYSxJQUFJLFNBQVMsSUFBYiw4REFBZ0Msc0JBQVksS0FBNUMsY0FBdUQsZUFBdkQsRUFBd0UsTUFBeEUsQ0FBYjtBQUNBLFVBQUssS0FBTCxDQUFXLFNBQVgsR0FBdUIsUUFBdkI7QUFDQSxVQUFLLEtBQUwsQ0FBVyxDQUFYLEdBQWUsUUFBUSxDQUF2QjtBQUNBLFVBQUssS0FBTCxDQUFXLENBQVgsR0FBZSxHQUFmOztBQUVBLFVBQUssU0FBTCxHQUFpQixrQkFBUSxTQUFSLENBQWpCO0FBQ0EsVUFBSyxTQUFMLENBQWUsQ0FBZixHQUFtQixRQUFRLENBQTNCO0FBQ0EsVUFBSyxTQUFMLENBQWUsQ0FBZixHQUFtQixHQUFuQjs7QUFFQSxVQUFLLFFBQUwsR0FBZ0Isa0JBQVEsWUFBUixFQUFzQixRQUF0QixDQUFoQjtBQUNBLFVBQUssUUFBTCxDQUFjLENBQWQsR0FBa0IsUUFBUSxDQUExQjtBQUNBLFVBQUssUUFBTCxDQUFjLENBQWQsR0FBa0IsR0FBbEI7O0FBRUEsVUFBSyxRQUFMLENBQWMsTUFBSyxFQUFuQixFQUF1QixNQUFLLEdBQTVCLEVBQWlDLE1BQUssUUFBdEMsRUFBZ0QsTUFBSyxLQUFyRCxFQUE0RCxNQUFLLFNBQWpFLEVBQTRFLE1BQUssUUFBakY7O0FBRUEsUUFBSSxzQkFBWSxLQUFaLEdBQW9CLHNCQUFZLFFBQXBDLEVBQThDO0FBQzVDLFlBQUssUUFBTCxDQUFjLElBQWQseUZBQXdDLHNCQUFZLFFBQXBEO0FBQ0EsNEJBQVksUUFBWixHQUF1QixzQkFBWSxLQUFuQztBQUNBLDhCQUFjLEdBQWQsQ0FBa0IsVUFBbEIsRUFBOEIsc0JBQVksUUFBMUM7QUFDQSxZQUFLLEtBQUwsQ0FBVyxJQUFYLDZFQUFtQyxzQkFBWSxRQUEvQzs7QUFFQSw4QkFBYyxHQUFkLENBQWtCLGFBQWxCLEVBQWlDLENBQWpDLEVBQW9DLElBQXBDLENBQXlDLGlCQUF6QztBQUNEOztBQUVELFFBQUksc0JBQVksUUFBWixLQUF5QixLQUE3QixFQUFvQztBQUNsQyxZQUFLLE9BQUwsR0FBZSxJQUFJLFNBQVMsSUFBYixDQUFrQixFQUFsQixFQUFzQixlQUF0QixFQUF1QyxNQUF2QyxDQUFmO0FBQ0EsWUFBSyxPQUFMLENBQWEsU0FBYixHQUF5QixRQUF6QjtBQUNBLFlBQUssT0FBTCxDQUFhLENBQWIsR0FBaUIsUUFBUSxDQUF6QjtBQUNBLFlBQUssT0FBTCxDQUFhLENBQWIsR0FBaUIsR0FBakI7QUFDQSxZQUFLLFFBQUwsQ0FBYyxNQUFLLE9BQW5COztBQUVBLFVBQUksc0JBQVksR0FBaEIsRUFBcUI7QUFDbkIsY0FBSyxPQUFMLENBQWEsSUFBYixJQUF3QixzQkFBWSxLQUFaLENBQWtCLElBQTFDLDRCQUFxRCxzQkFBWSxLQUFaLENBQWtCLEdBQWxCLEtBQTBCLENBQTFCLEdBQThCLEdBQTlCLEdBQW9DLEVBQXpGLDJEQUF1RyxzQkFBWSxLQUFaLENBQWtCLEdBQWxCLEtBQTBCLENBQTFCLEdBQThCLEdBQTlCLEdBQW9DLEVBQTNJO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsY0FBSyxPQUFMLENBQWEsSUFBYixJQUF3QixzQkFBWSxLQUFaLENBQWtCLElBQTFDLDhDQUF3RCxzQkFBWSxLQUFaLENBQWtCLEdBQWxCLEtBQTBCLENBQTFCLEdBQThCLElBQTlCLEdBQXFDLEVBQTdGO0FBQ0Q7QUFDRjs7QUFFRCxRQUFNLFFBQVEsc0JBQVksTUFBWixDQUFtQixzQkFBWSxRQUEvQixFQUF5QyxzQkFBWSxHQUFyRCxDQUFkO0FBQ0EsUUFBTSxnQkFBYyx5QkFBVSxNQUFNLENBQU4sQ0FBVixFQUFvQixNQUFNLENBQU4sQ0FBcEIsQ0FBcEI7QUFDQSxRQUFNLFNBQVM7QUFDYixZQUFNLHNCQUFZLElBREw7QUFFYixjQUFRLHNCQUFZLE1BRlA7QUFHYixlQUFTLHNCQUFZO0FBSFIsS0FBZjs7QUFNQSw0QkFBYyxHQUFkLENBQWtCLEtBQWxCLEVBQXlCLENBQXpCLEVBQTRCLElBQTVCLENBQWlDLGFBQUs7QUFDcEMsY0FBUSxJQUFSLENBQWEsS0FBYjtBQUNBLGNBQVEsSUFBUixDQUFhLE1BQWI7QUFDQSxjQUFRLElBQVIsQ0FBYSxDQUFiOztBQUVBLFVBQUksQ0FBQyxDQUFDLENBQUQsSUFBTSxFQUFFLE1BQUYsQ0FBUyxNQUFULEdBQWtCLEdBQWxCLEdBQXdCLE9BQU8sTUFBUCxDQUFjLE1BQTdDLEtBQ0EsS0FBSyxTQUFMLENBQWUsTUFBZixFQUF1QixNQUF2QixHQUFnQyxJQURwQyxFQUMwQztBQUN4QyxnQkFBUSxJQUFSLENBQWEsSUFBYjtBQUNBLGdDQUFjLEdBQWQsQ0FBa0IsS0FBbEIsRUFBeUIsTUFBekIsRUFBaUMsQ0FBakM7QUFDRDtBQUNGLEtBVkQ7O0FBWUEsVUFBSyxVQUFMO0FBckVpQjtBQXNFbEI7Ozs7aUNBQ1k7QUFDWCxXQUFLLFNBQUwsQ0FBZSxnQkFBZixDQUFnQyxPQUFoQyxFQUF5QyxNQUF6QztBQUNBLFdBQUssUUFBTCxDQUFjLGdCQUFkLENBQStCLE9BQS9CLEVBQXdDLEtBQXhDOztBQUVBLFdBQUssU0FBTCxHQUFpQixhQUFLO0FBQ3BCLFlBQUksRUFBRSxPQUFGLEtBQWMsRUFBbEIsRUFBc0I7QUFDcEI7QUFDQSxZQUFFLGNBQUY7QUFDRDtBQUNGLE9BTEQ7QUFNQSxhQUFPLGdCQUFQLENBQXdCLFNBQXhCLEVBQW1DLEtBQUssU0FBeEM7QUFDRDs7OzhCQUNTO0FBQ1IsYUFBTyxtQkFBUCxDQUEyQixTQUEzQixFQUFzQyxLQUFLLFNBQTNDO0FBQ0Q7Ozs7RUF0Rm9DLFNBQVMsUzs7a0JBQTNCLFM7OztBQXlGckIsU0FBUyxNQUFULEdBQWtCO0FBQ2hCLFVBQVEsc0JBQVksUUFBcEI7QUFDRSxTQUFLLFFBQUw7QUFDRSwrQkFBZSxNQUFmLENBQXNCLFlBQXRCO0FBQ0E7QUFDRixTQUFLLEtBQUw7QUFDRSwrQkFBZSxNQUFmLENBQXNCLFdBQXRCO0FBQ0E7QUFOSjtBQVFEOztBQUVELFNBQVMsS0FBVCxHQUFrQjtBQUNoQixNQUFJLFVBQVUsRUFBZDtBQUNBLFVBQVEsc0JBQVksUUFBcEI7QUFDRSxTQUFLLFFBQUw7QUFDRSw2RUFBdUIsc0JBQVksSUFBWixDQUFpQixHQUFqQixLQUF5QixDQUF6QixHQUE2QixHQUE3QixHQUFtQyxFQUExRCxVQUFnRSxzQkFBWSxLQUE1RTtBQUNBLFVBQUksc0JBQVksS0FBWixLQUFzQixzQkFBWSxRQUF0QyxFQUFnRDtBQUM5QyxtQkFBVywwQkFBWDtBQUNEO0FBQ0QsaUJBQVcseUJBQVg7QUFDQTtBQUNGLFNBQUssS0FBTDtBQUNFLFVBQUksc0JBQVksR0FBaEIsRUFBcUI7QUFDbkIsbUJBQWMsc0JBQVksS0FBWixDQUFrQixJQUFoQyw0QkFBMkMsc0JBQVksS0FBWixDQUFrQixHQUFsQixLQUEwQixDQUExQixHQUE4QixHQUE5QixHQUFvQyxFQUEvRSwyREFBNkYsc0JBQVksS0FBWixDQUFrQixHQUFsQixLQUEwQixDQUExQixHQUE4QixHQUE5QixHQUFvQyxFQUFqSTtBQUNELE9BRkQsTUFFTztBQUNMLG1CQUFjLHNCQUFZLEtBQVosQ0FBa0IsSUFBaEMsOENBQThDLHNCQUFZLEtBQVosQ0FBa0IsR0FBbEIsS0FBMEIsQ0FBMUIsR0FBOEIsSUFBOUIsR0FBcUMsRUFBbkY7QUFFRDtBQUNELFVBQUksc0JBQVksS0FBWixLQUFzQixzQkFBWSxRQUF0QyxFQUFnRDtBQUM5QyxpSEFBaUMsc0JBQVksS0FBN0M7QUFDRDtBQUNEO0FBbEJKO0FBb0JBLDBCQUFjLEtBQWQsQ0FBb0IsT0FBcEIsRUFBNkIsc0JBQVksUUFBekM7QUFDRDs7QUFFRCxTQUFTLGlCQUFULENBQTJCLFdBQTNCLEVBQXdDO0FBQ3RDLE1BQUksWUFBWSxZQUFZLE1BQVosR0FBcUIsQ0FBakMsRUFBb0MsS0FBcEMsSUFBNkMsc0JBQVksUUFBN0QsRUFBdUU7QUFDckU7QUFDRDs7QUFFRCxNQUFNLGFBQWEsWUFBWSxJQUFaLENBQWlCO0FBQUEsV0FBTSxHQUFHLEVBQUgsS0FBVSxzQkFBWSxJQUFaLENBQWlCLEVBQWpDO0FBQUEsR0FBakIsQ0FBbkI7O0FBRUEsTUFBSSxVQUFKLEVBQWdCO0FBQ2QsZUFBVyxLQUFYLEdBQW1CLHNCQUFZLFFBQS9CO0FBQ0QsR0FGRCxNQUVPO0FBQ0wsUUFBTSxZQUFZO0FBQ2hCLFVBQUksc0JBQVksSUFBWixDQUFpQixFQURMO0FBRWhCLFlBQU0sc0JBQVksSUFBWixDQUFpQixJQUZQO0FBR2hCLGFBQU8sc0JBQVk7QUFISCxLQUFsQjtBQUtBLFFBQUksWUFBWSxNQUFaLEdBQXFCLEVBQXpCLEVBQTZCO0FBQzNCLGtCQUFZLElBQVosQ0FBaUIsU0FBakI7QUFDRCxLQUZELE1BRU87QUFDTCxrQkFBWSxZQUFZLE1BQVosR0FBcUIsQ0FBakMsSUFBc0MsU0FBdEM7QUFDRDtBQUNGOztBQUVELGNBQVksSUFBWixDQUFpQixVQUFDLENBQUQsRUFBSSxDQUFKO0FBQUEsV0FBVSxFQUFFLEtBQUYsR0FBVSxFQUFFLEtBQXRCO0FBQUEsR0FBakI7QUFDQSwwQkFBYyxHQUFkLENBQWtCLGFBQWxCLEVBQWlDLFdBQWpDLEVBQThDLENBQTlDO0FBQ0Q7Ozs7Ozs7Ozs7O0FDN0pEOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU0sZ0JBQWdCLEVBQXRCO0FBQ0EsSUFBTSxjQUFjLENBQXBCOztJQUVxQixVOzs7QUFDbkIsc0JBQVksS0FBWixFQUFtQixNQUFuQixFQUEyQjtBQUFBOztBQUFBOztBQUd6QixVQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsVUFBSyxNQUFMLEdBQWMsTUFBZDs7QUFFQSxVQUFLLEtBQUwsR0FBYSxXQUFiO0FBQ0EsVUFBSyxVQUFMLEdBQWtCLEdBQWxCO0FBQ0EsVUFBSyxJQUFMLEdBQVksQ0FBWjtBQUNBLFVBQUssUUFBTCxHQUFnQixDQUFoQjs7QUFFQSwwQkFBWSxRQUFaLEdBQXVCLFFBQXZCO0FBQ0EsMEJBQVksT0FBWixHQUFzQixFQUF0QjtBQUNBLDBCQUFZLE1BQVosR0FBcUIsRUFBckI7QUFDQSwwQkFBWSxHQUFaLEdBQWtCLENBQWxCOztBQUVBLFVBQUssYUFBTCxHQUFxQiw0QkFBa0IsTUFBSyxLQUF2QixFQUE4QixNQUFLLE1BQW5DLENBQXJCO0FBQ0EsVUFBSyxRQUFMO0FBQ0EsVUFBSyxZQUFMO0FBQ0EsVUFBSyxVQUFMO0FBQ0EsVUFBSyxTQUFMOztBQUVBLFVBQUssS0FBTCxDQUFXLHNDQUFYO0FBQ0EsVUFBSyxVQUFMOztBQUVBLFVBQUssS0FBTCxHQUFhLElBQUksU0FBUyxJQUFiLENBQWtCLEVBQWxCLEVBQXNCLGVBQXRCLEVBQXVDLE1BQXZDLENBQWI7QUFDQSxVQUFLLEtBQUwsQ0FBVyxTQUFYLEdBQXVCLFFBQXZCO0FBQ0EsVUFBSyxLQUFMLENBQVcsWUFBWCxHQUEwQixRQUExQjtBQUNBLFVBQUssS0FBTCxDQUFXLENBQVgsR0FBZSxRQUFRLENBQXZCO0FBQ0EsVUFBSyxLQUFMLENBQVcsQ0FBWCxHQUFlLEdBQWY7QUFDQSxVQUFLLFFBQUwsQ0FBYyxNQUFLLEtBQW5COztBQUVBO0FBQ0EsWUFBUSxzQkFBWSxRQUFaLEdBQXVCLEVBQXZCLEdBQTRCLHlCQUFVLEVBQVYsQ0FBNUIsR0FBNEMsRUFBcEQ7QUFDRSxXQUFLLENBQUw7QUFDRSw4QkFBWSxRQUFaLEdBQXVCLFlBQXZCO0FBQ0EsY0FBSyxLQUFMLENBQVcsSUFBWCxHQUFrQixlQUFsQjtBQUNBLGNBQUssS0FBTCxDQUFXLENBQVgsR0FBZSxTQUFTLE1BQUssS0FBTCxDQUFXLENBQW5DO0FBQ0EsY0FBSyxhQUFMLENBQW1CLE9BQW5CLENBQTJCLGtCQUEzQjtBQUNBLGNBQUssV0FBTCxDQUFpQixDQUFqQixHQUFxQixTQUFTLE1BQUssV0FBTCxDQUFpQixDQUEvQztBQUNBLGNBQUssV0FBTCxDQUFpQixLQUFqQixHQUF5QixNQUF6QjtBQUNBLGNBQUssQ0FBTCxHQUFTLE1BQUssYUFBTCxDQUFtQixDQUFuQixHQUF1QixNQUFoQztBQUNBLGNBQUssTUFBTCxHQUFjLE1BQUssYUFBTCxDQUFtQixNQUFuQixHQUE0QixNQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLE1BQUssV0FBTCxDQUFpQixNQUFqQixHQUEwQixDQUFDLENBQXpGO0FBQ0E7QUFDRixXQUFLLENBQUw7QUFDRSw4QkFBWSxRQUFaLEdBQXVCLFVBQXZCO0FBQ0EsY0FBSyxLQUFMLENBQVcsSUFBWCxHQUFrQixTQUFsQjtBQUNBLGNBQUssYUFBTCxDQUFtQixPQUFuQixDQUEyQixxQkFBM0I7QUFDQSxjQUFLLEtBQUwsQ0FBVyxDQUFYLEdBQWUsUUFBUSxNQUFLLEtBQUwsQ0FBVyxDQUFsQztBQUNBLGNBQUssV0FBTCxDQUFpQixDQUFqQixHQUFxQixRQUFRLE1BQUssV0FBTCxDQUFpQixDQUE5QztBQUNBLGNBQUssQ0FBTCxHQUFTLE1BQUssYUFBTCxDQUFtQixDQUFuQixHQUF1QixLQUFoQztBQUNBLGNBQUssTUFBTCxHQUFjLE1BQUssSUFBTCxDQUFVLE1BQVYsR0FBbUIsTUFBSyxhQUFMLENBQW1CLE1BQW5CLEdBQTRCLE1BQUssS0FBTCxDQUFXLE1BQVgsR0FBb0IsTUFBSyxXQUFMLENBQWlCLE1BQWpCLEdBQTBCLENBQUMsQ0FBNUc7QUFDQTtBQUNGLFdBQUssQ0FBTDtBQUNFLDhCQUFZLFFBQVosR0FBdUIsTUFBdkI7QUFDQSxjQUFLLEtBQUwsQ0FBVyxJQUFYLEdBQWtCLGlCQUFsQjtBQUNBLGNBQUssYUFBTCxDQUFtQixPQUFuQixDQUEyQiwwQkFBM0I7QUFDQSxjQUFLLEtBQUwsSUFBYyxDQUFkO0FBQ0EsY0FBSyxVQUFMLElBQW1CLElBQW5CO0FBQ0E7QUFDRixXQUFLLENBQUw7QUFDRSw4QkFBWSxRQUFaLEdBQXVCLE1BQXZCO0FBQ0EsY0FBSyxLQUFMLENBQVcsSUFBWCxHQUFrQixrQkFBbEI7QUFDQSxjQUFLLGFBQUwsQ0FBbUIsT0FBbkIsQ0FBMkIseUJBQTNCO0FBQ0EsY0FBSyxLQUFMLElBQWMsQ0FBZDtBQUNBLGNBQUssVUFBTCxJQUFtQixLQUFuQjtBQUNBO0FBQ0YsV0FBSyxDQUFMO0FBQ0UsOEJBQVksUUFBWixHQUF1QixZQUF2QjtBQUNBLGNBQUssS0FBTCxDQUFXLElBQVgsR0FBa0IsZ0JBQWxCO0FBQ0EsY0FBSyxhQUFMLENBQW1CLE9BQW5CLENBQTJCLHFCQUEzQjtBQUNBLGNBQUssTUFBTCxDQUFZLE9BQVosQ0FBb0IsVUFBQyxLQUFELEVBQVEsQ0FBUixFQUFjO0FBQ2hDLGdCQUFNLEtBQU4sR0FBYyxTQUFTLEtBQVQsQ0FBZSxHQUFmLENBQW1CLEtBQW5CLEVBQTBCLEVBQUUsTUFBTSxJQUFSLEVBQWMsUUFBUSxJQUF0QixFQUExQixFQUNYLEVBRFcsQ0FDUixFQUFFLE9BQU8sQ0FBVCxFQURRLEVBQ00sTUFBTSxJQUFJLEdBRGhCLEVBRVgsRUFGVyxDQUVSLEVBQUUsT0FBTyxDQUFDLENBQVYsRUFGUSxFQUVPLE9BQU8sSUFBSSxHQUZsQixFQUdYLEVBSFcsQ0FHUixFQUFFLE9BQU8sQ0FBVCxFQUhRLEVBR00sTUFBTSxJQUFJLEdBSGhCLENBQWQ7QUFJRCxTQUxEO0FBTUE7QUFDRixXQUFLLENBQUw7QUFDRSw4QkFBWSxRQUFaLEdBQXVCLEtBQXZCO0FBQ0EsY0FBSyxLQUFMLENBQVcsSUFBWCxHQUFrQixRQUFsQjtBQUNBLGNBQUssYUFBTCxDQUFtQixPQUFuQixDQUEyQixtQkFBM0I7QUFDQSxjQUFLLEtBQUwsSUFBYyxHQUFkO0FBQ0EsY0FBSyxHQUFMLEdBQVcsSUFBSSxTQUFTLEtBQWIsRUFBWDtBQUNBLGNBQUssR0FBTCxDQUFTLFFBQVQsQ0FDRyx1QkFESCxDQUVJLENBQUMsd0JBQUQsRUFBMkIsMEJBQTNCLEVBQXVELDBCQUF2RCxFQUFtRiwwQkFBbkYsRUFBK0csTUFBL0csQ0FGSixFQUdJLENBQUMsQ0FBRCxFQUFJLEdBQUosRUFBUyxHQUFULEVBQWMsR0FBZCxFQUFtQixDQUFuQixDQUhKLEVBRzJCLENBSDNCLEVBRzhCLENBSDlCLEVBR2lDLENBSGpDLEVBR29DLENBSHBDLEVBR3VDLENBSHZDLEVBRzBDLEdBSDFDLEVBSUcsUUFKSCxDQUlZLENBQUMsTUFBSyxLQUFOLEdBQWMsQ0FKMUIsRUFJNkIsQ0FBQyxNQUFLLE1BSm5DLEVBSTJDLE1BQUssS0FKaEQsRUFJdUQsTUFBSyxNQUFMLEdBQWMsQ0FKckU7QUFLQSxjQUFLLEdBQUwsQ0FBUyxLQUFULENBQWUsQ0FBQyxNQUFLLEtBQU4sR0FBYyxDQUE3QixFQUFnQyxDQUFDLE1BQUssTUFBdEMsRUFBOEMsTUFBSyxLQUFuRCxFQUEwRCxNQUFLLE1BQUwsR0FBYyxDQUF4RTtBQUNBLGNBQUssR0FBTCxDQUFTLENBQVQsR0FBYSxNQUFLLElBQUwsQ0FBVSxDQUF2QjtBQUNBLGNBQUssR0FBTCxDQUFTLENBQVQsR0FBYSxNQUFLLElBQUwsQ0FBVSxDQUF2QjtBQUNBLGNBQUssR0FBTCxDQUFTLGdCQUFULENBQTBCLE1BQTFCLEVBQWtDLFlBQU07QUFDdEMsY0FBSSxDQUFDLE1BQUssSUFBTCxDQUFVLElBQWYsRUFBcUI7QUFDbkIsa0JBQUssR0FBTCxDQUFTLENBQVQsR0FBYSxNQUFLLElBQUwsQ0FBVSxDQUF2QjtBQUNEO0FBQ0YsU0FKRDtBQUtBLGNBQUssUUFBTCxDQUFjLE1BQUssR0FBbkIsRUFBd0IsTUFBSyxXQUE3QjtBQUNBO0FBQ0Y7QUFDRSw4QkFBWSxRQUFaLEdBQXVCLFFBQXZCO0FBQ0E7QUFwRUo7QUFzRUEsVUFBSyxNQUFMLENBQVksT0FBWixDQUFvQjtBQUFBLGFBQVMsTUFBSyxVQUFMLENBQWdCLEtBQWhCLENBQVQ7QUFBQSxLQUFwQjtBQUNBLFlBQVEsR0FBUixDQUFZLHNCQUFZLFFBQXhCO0FBeEd5QjtBQXlHMUI7Ozs7K0JBQ1U7QUFDVCxXQUFLLEtBQUwsR0FBYSx5QkFBZSxLQUFmLEVBQXNCLEtBQUssS0FBM0IsQ0FBYjtBQUNBLFdBQUssVUFBTCxHQUFrQix5QkFBZSxVQUFmLEVBQTJCLEtBQUssS0FBaEMsQ0FBbEI7QUFDQSxXQUFLLFFBQUwsR0FBZ0IseUJBQWUsUUFBZixFQUF5QixLQUFLLEtBQTlCLENBQWhCO0FBQ0EsV0FBSyxLQUFMLENBQVcsQ0FBWCxHQUFlLEtBQUssVUFBTCxDQUFnQixDQUFoQixHQUFvQixLQUFLLFFBQUwsQ0FBYyxDQUFkLEdBQWtCLEtBQUssTUFBMUQ7QUFDQSxXQUFLLFFBQUwsQ0FBYyxLQUFLLEtBQW5CLEVBQTBCLEtBQUssVUFBL0IsRUFBMkMsS0FBSyxRQUFoRDtBQUNEOzs7bUNBQ2M7QUFDYixXQUFLLE1BQUwsR0FBYyxDQUFDLHFCQUFELEVBQWMscUJBQWQsQ0FBZDtBQUNBLFdBQUssTUFBTCxDQUFZLENBQVosRUFBZSxDQUFmLEdBQW1CLENBQUMsS0FBSyxNQUFMLENBQVksQ0FBWixFQUFlLE1BQWYsQ0FBc0IsS0FBdkIsR0FBK0IsQ0FBbEQ7QUFDQSxXQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWUsQ0FBZixHQUFtQixLQUFLLEtBQUwsR0FBYSxDQUFoQztBQUNBLFdBQUssUUFBTCxnQ0FBaUIsS0FBSyxNQUF0QjtBQUNEOzs7aUNBQ1k7QUFDWCxXQUFLLElBQUwsR0FBWSxtQkFBUyxzQkFBWSxRQUFyQixDQUFaO0FBQ0EsV0FBSyxJQUFMLENBQVUsQ0FBVixHQUFjLEtBQUssS0FBTCxHQUFhLENBQTNCO0FBQ0EsV0FBSyxJQUFMLENBQVUsQ0FBVixHQUFjLEdBQWQ7QUFDQSxXQUFLLFFBQUwsQ0FBYyxLQUFLLElBQW5CO0FBQ0Q7OztnQ0FDVztBQUNWLFdBQUssV0FBTCxHQUFtQixJQUFJLFNBQVMsSUFBYixDQUFrQixLQUFsQixFQUF5QixlQUF6QixFQUEwQyxNQUExQyxDQUFuQjtBQUNBLFdBQUssV0FBTCxDQUFpQixDQUFqQixHQUFxQixFQUFyQjtBQUNBLFdBQUssV0FBTCxDQUFpQixDQUFqQixHQUFxQixFQUFyQjtBQUNBLFdBQUssUUFBTCxDQUFjLEtBQUssV0FBbkI7QUFDRDs7OytCQUNVLEssRUFBTztBQUNoQixZQUFNLE1BQU4sR0FBZSxDQUFDLENBQUMsS0FBSyxVQUFMLEdBQWtCLEtBQUssTUFBTCxLQUFnQixJQUFuQyxFQUF5QyxPQUF6QyxDQUFpRCxDQUFqRCxDQUFoQjtBQUNBLFlBQU0sQ0FBTixJQUFXLEtBQUssS0FBTCxHQUFhLE1BQU0sTUFBTixDQUFhLEtBQXJDO0FBQ0EsVUFBSSxLQUFLLE1BQUwsS0FBZ0IsR0FBcEIsRUFBeUI7QUFDdkIsY0FBTSxDQUFOLEdBQVUsS0FBSyxNQUFMLEdBQWMsYUFBeEI7QUFDRCxPQUZELE1BRU87QUFDTCxjQUFNLENBQU4sR0FBVSxDQUFWO0FBQ0EsY0FBTSxNQUFOLEdBQWUsQ0FBQyxNQUFNLE1BQXRCO0FBQ0Q7QUFDRCw0QkFBWSxNQUFaLENBQW1CLElBQW5CLENBQXdCLE1BQU0sTUFBOUI7QUFDRDs7OzBCQUNLLEksRUFBTTtBQUNWLFdBQUssTUFBTCxHQUFjLElBQWQ7QUFDQSxXQUFLLGFBQUwsQ0FBbUIsT0FBbkIsQ0FBMkIsSUFBM0I7QUFDQSxXQUFLLFFBQUwsQ0FBYyxLQUFLLGFBQW5CO0FBQ0Q7OztpQ0FDWTtBQUFBOztBQUNYLFdBQUssZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0I7QUFBQSxlQUFNLE9BQUssWUFBTCxFQUFOO0FBQUEsT0FBL0I7QUFDQSxXQUFLLFNBQUwsR0FBaUIsYUFBSztBQUNwQixnQkFBUSxFQUFFLE9BQVY7QUFDRSxlQUFLLEVBQUw7QUFDRSxtQkFBSyxZQUFMO0FBQ0EsY0FBRSxjQUFGO0FBQ0E7QUFDRixlQUFLLEVBQUw7QUFDRSxtQkFBSyxXQUFMO0FBQ0E7QUFQSjtBQVNELE9BVkQ7O0FBWUEsYUFBTyxnQkFBUCxDQUF3QixTQUF4QixFQUFtQyxLQUFLLFNBQXhDO0FBQ0Q7OzttQ0FDYztBQUNiLFVBQUksS0FBSyxNQUFULEVBQWlCO0FBQ2YsWUFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxlQUFLLFdBQUwsQ0FBaUIsS0FBSyxLQUF0QjtBQUNBLGVBQUssS0FBTCxHQUFhLElBQWI7QUFDRDtBQUNELGFBQUssV0FBTDtBQUNELE9BTkQsTUFNTztBQUNMLGFBQUssSUFBTCxDQUFVLElBQVY7QUFDQSw4QkFBWSxPQUFaLENBQW9CLEtBQUssSUFBekIsSUFBaUMsQ0FBakM7QUFDRDtBQUNGOzs7a0NBQ2E7QUFBQTs7QUFDWixVQUFJLEtBQUssTUFBVCxFQUFpQjtBQUNmLGFBQUssTUFBTCxHQUFjLEtBQWQ7QUFDQSxhQUFLLFdBQUwsQ0FBaUIsS0FBSyxhQUF0QjtBQUNELE9BSEQsTUFHTztBQUNMLGFBQUssS0FBTCxDQUFXLHdCQUFYO0FBQ0Q7QUFDRCxVQUFJLHNCQUFZLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekMsYUFBSyxNQUFMLENBQVksT0FBWixDQUFvQjtBQUFBLGlCQUFTLE1BQU0sS0FBTixDQUFZLFNBQVosQ0FBc0IsT0FBSyxNQUEzQixDQUFUO0FBQUEsU0FBcEI7QUFDRDtBQUNGOzs7Z0NBQ1c7QUFDVixVQUFJLEtBQUssSUFBTCxDQUFVLElBQWQsRUFBb0I7QUFDbEIsYUFBSyxJQUFMLENBQVUsQ0FBVixJQUFlLEtBQUssS0FBTCxHQUFhLEdBQTVCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBSyxVQUFMLENBQWdCLEtBQUssS0FBckI7QUFDQSxhQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLEtBQUssS0FBTCxHQUFhLEdBQTdCO0FBQ0EsYUFBSyxVQUFMLENBQWdCLElBQWhCLENBQXFCLEtBQUssS0FBTCxHQUFhLEdBQWxDO0FBQ0EsYUFBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixLQUFLLEtBQXhCOztBQUVBLGFBQUssUUFBTCxJQUFpQixLQUFLLEtBQXRCO0FBQ0EsOEJBQVksS0FBWixHQUFvQixLQUFLLEtBQUwsQ0FBVyxLQUFLLFFBQUwsR0FBZ0IsRUFBM0IsQ0FBcEI7QUFDQSxhQUFLLFdBQUwsQ0FBaUIsSUFBakIsR0FBMkIsc0JBQVksS0FBdkM7QUFDRDtBQUNGOzs7aUNBQ1k7QUFBQTs7QUFDWCxXQUFLLE1BQUwsQ0FBWSxPQUFaLENBQW9CLGlCQUFTO0FBQzNCLGNBQU0sQ0FBTixJQUFXLE9BQUssS0FBaEI7QUFDQSxZQUFJLE1BQU0sQ0FBTixHQUFVLENBQUMsTUFBTSxNQUFOLENBQWEsS0FBZCxHQUFzQixDQUFwQyxFQUF1QztBQUNyQyxpQkFBSyxVQUFMLENBQWdCLEtBQWhCO0FBQ0EsaUJBQUssS0FBTCxJQUFjLElBQWQ7QUFDRDtBQUNELFlBQUksTUFBTSxtQkFBTixDQUEwQixPQUFLLElBQS9CLEVBQXFDLEtBQXJDLENBQUosRUFBaUQ7QUFDL0MsaUJBQUssSUFBTCxDQUFVLEdBQVY7QUFDRDtBQUNGLE9BVEQ7QUFVRDs7OytCQUNVO0FBQ1QsV0FBSyxJQUFMLENBQVUsSUFBVjtBQUNBLFVBQUksS0FBSyxJQUFMLENBQVUsQ0FBVixHQUFjLENBQWxCLEVBQXFCO0FBQ25CLGFBQUssSUFBTCxDQUFVLEVBQVYsR0FBZSxDQUFmO0FBQ0EsYUFBSyxJQUFMLENBQVUsQ0FBVixHQUFjLENBQWQ7QUFDRCxPQUhELE1BR08sSUFBSSxLQUFLLElBQUwsQ0FBVSxDQUFWLEdBQWMsS0FBSyxNQUFMLEdBQWMsS0FBSyxJQUFMLENBQVUsTUFBVixDQUFpQixNQUFqQixHQUEwQixDQUExRCxFQUE2RDtBQUNsRSxpQ0FBZSxNQUFmLENBQXNCLFdBQXRCO0FBQ0QsT0FGTSxNQUVBLElBQUksS0FBSyxJQUFMLENBQVUsQ0FBVixHQUFjLEtBQUssTUFBTCxJQUFlLGdCQUFnQixLQUFLLElBQUwsQ0FBVSxNQUFWLENBQWlCLE1BQWpCLEdBQTBCLENBQXpELENBQWxCLEVBQStFO0FBQ3BGLGFBQUssSUFBTCxDQUFVLEdBQVY7QUFDRDtBQUNGOzs7MkJBQ007QUFDTCxVQUFJLEtBQUssTUFBVCxFQUFpQjtBQUNmO0FBQ0Q7QUFDRCxXQUFLLFNBQUw7QUFDQSxXQUFLLFFBQUw7QUFDQSxXQUFLLElBQUwsSUFBYSxDQUFiO0FBQ0Q7Ozs4QkFDUztBQUNSLGFBQU8sbUJBQVAsQ0FBMkIsU0FBM0IsRUFBc0MsS0FBSyxTQUEzQztBQUNEOzs7O0VBMU9xQyxTQUFTLFM7O2tCQUE1QixVOzs7Ozs7Ozs7OztBQ1hyQjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU0sZ0JBQWdCLEVBQXRCO0FBQ0EsSUFBTSxjQUFjLENBQXBCOztJQUVxQixVOzs7QUFDbkIsc0JBQVksS0FBWixFQUFtQixNQUFuQixFQUEyQjtBQUFBOztBQUFBOztBQUd6QixVQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsVUFBSyxNQUFMLEdBQWMsTUFBZDs7QUFFQSxVQUFLLEtBQUwsR0FBYSxXQUFiO0FBQ0EsVUFBSyxPQUFMLEdBQWUsS0FBZjs7QUFFQSxVQUFLLFFBQUw7O0FBRUEsUUFBTSxhQUFhLElBQUksU0FBUyxJQUFiLENBQWtCLHVCQUFsQixFQUEyQyxlQUEzQyxFQUE0RCxNQUE1RCxDQUFuQjtBQUNBLGVBQVcsU0FBWCxHQUF1QixRQUF2QjtBQUNBLGVBQVcsQ0FBWCxHQUFlLFFBQVEsQ0FBdkI7QUFDQSxlQUFXLENBQVgsR0FBZSxHQUFmOztBQUVBLFFBQU0sWUFBWSxrQkFBUSxRQUFSLEVBQWtCLFFBQWxCLENBQWxCO0FBQ0EsY0FBVSxDQUFWLEdBQWMsUUFBUSxDQUF0QjtBQUNBLGNBQVUsQ0FBVixHQUFjLEdBQWQ7QUFDQSxjQUFVLGdCQUFWLENBQTJCLE9BQTNCLEVBQW9DO0FBQUEsYUFBTSx5QkFBZSxNQUFmLENBQXNCLGFBQXRCLENBQU47QUFBQSxLQUFwQzs7QUFFQSxVQUFLLFFBQUwsQ0FBYyxVQUFkLEVBQTBCLFNBQTFCOztBQUVBLFFBQU0sUUFBUTtBQUNaLFNBQUcsWUFEUztBQUVaLFNBQUcsVUFGUztBQUdaLFNBQUcsTUFIUztBQUlaLFNBQUcsTUFKUztBQUtaLFNBQUcsWUFMUztBQU1aLFNBQUcsS0FOUztBQU9aLFNBQUcsUUFQUztBQVFaLFNBQUcsUUFSUztBQVNaLFNBQUcsUUFUUztBQVVaLFNBQUcsUUFWUztBQVdaLFVBQUk7QUFYUSxLQUFkO0FBYUEsMEJBQVksUUFBWixHQUF1QixNQUFNLHNCQUFZLFFBQVosR0FBdUIsRUFBdkIsR0FBNEIseUJBQVUsRUFBVixDQUE1QixHQUE0QyxFQUFsRCxDQUF2QjtBQUNBLFlBQVEsR0FBUixDQUFZLHNCQUFZLFFBQXhCO0FBQ0EsMEJBQVksR0FBWixHQUFrQix5QkFBVSxDQUFWLENBQWxCOztBQUVBLFFBQU0sYUFBYSxzQkFBWSxNQUFaLENBQW1CLHNCQUFZLFFBQS9CLEVBQXlDLElBQUksc0JBQVksR0FBekQsQ0FBbkI7QUFDQSxRQUFNLHFCQUFtQix5QkFBVSxXQUFXLENBQVgsQ0FBVixFQUF5QixXQUFXLENBQVgsQ0FBekIsQ0FBekI7QUFDQSxZQUFRLElBQVIsQ0FBYSxVQUFiOztBQUVBLFlBQVEsR0FBUixDQUFZLENBQ1Ysd0JBQWMsR0FBZCxDQUFrQixVQUFsQixFQUE4QixDQUE5QixFQUFpQyxJQUFqQyxDQUFzQztBQUFBLGFBQUssTUFBSyxRQUFMLENBQWMsQ0FBZCxDQUFMO0FBQUEsS0FBdEMsQ0FEVSxFQUVWLElBQUksT0FBSixDQUFZO0FBQUEsYUFBVyxXQUFXLE9BQVgsRUFBb0IsS0FBSyxNQUFMLEtBQWdCLElBQWhCLEdBQXVCLEdBQTNDLENBQVg7QUFBQSxLQUFaLENBRlUsQ0FBWixFQUdHLElBSEgsQ0FHUSxZQUFNO0FBQ1osWUFBSyxJQUFMO0FBQ0EsWUFBSyxXQUFMLENBQWlCLFVBQWpCLEVBQTZCLFNBQTdCO0FBQ0QsS0FORCxFQU1HLEtBTkgsQ0FNUyxhQUFLO0FBQ1osaUJBQVcsSUFBWCxHQUFrQiw0QkFBbEI7QUFDQSxjQUFRLEtBQVIsQ0FBYyxDQUFkO0FBQ0QsS0FURDs7QUFXQSxVQUFLLFVBQUw7QUF2RHlCO0FBd0QxQjs7Ozs2QkFDUSxNLEVBQVE7QUFDZiw0QkFBWSxRQUFaLEdBQXVCLEtBQXZCO0FBQ0EsNEJBQVksR0FBWixHQUFrQixLQUFsQjtBQUNBLDRCQUFZLE9BQVosR0FBc0IsRUFBdEI7QUFDQSw0QkFBWSxNQUFaLEdBQXFCLEVBQXJCO0FBQ0EsNEJBQVksS0FBWixHQUFvQixPQUFPLElBQTNCO0FBQ0EsV0FBSyxXQUFMLEdBQW1CLE9BQU8sTUFBMUI7QUFDQSxXQUFLLFlBQUwsR0FBb0IsT0FBTyxPQUEzQjtBQUNBLFVBQUksc0JBQVksSUFBWixDQUFpQixFQUFqQixLQUF3QixPQUFPLElBQVAsQ0FBWSxFQUF4QyxFQUE0QztBQUMxQyw4QkFBWSxLQUFaLENBQWtCLElBQWxCLEdBQXlCLGlCQUF6QjtBQUNEO0FBQ0Y7OzsyQkFDTTtBQUFBOztBQUNMLFdBQUssVUFBTCxHQUFrQixDQUFsQjtBQUNBLFdBQUssSUFBTCxHQUFZLENBQVo7QUFDQSxXQUFLLFFBQUwsR0FBZ0IsQ0FBaEI7O0FBRUEsV0FBSyxZQUFMO0FBQ0EsV0FBSyxTQUFMOztBQUVBLFVBQU0sVUFBVSxJQUFJLFNBQVMsSUFBYixDQUFrQixDQUFsQixFQUFxQixnQkFBckIsRUFBdUMsTUFBdkMsQ0FBaEI7QUFDQSxjQUFRLFNBQVIsR0FBb0IsUUFBcEI7QUFDQSxjQUFRLENBQVIsR0FBWSxLQUFLLEtBQUwsR0FBYSxDQUF6QjtBQUNBLGNBQVEsQ0FBUixHQUFZLEdBQVo7O0FBRUEsV0FBSyxRQUFMLENBQWMsT0FBZDs7QUFFQSxVQUFNLFdBQVcsWUFBWSxZQUFNO0FBQ2pDLGdCQUFRLElBQVIsSUFBZ0IsQ0FBaEI7QUFDQSxZQUFJLFFBQVEsSUFBUixHQUFlLENBQW5CLEVBQXNCO0FBQ3BCLGlCQUFLLFdBQUwsQ0FBaUIsT0FBakI7QUFDQSxpQkFBSyxPQUFMLEdBQWUsSUFBZjtBQUNBLGNBQUksc0JBQVksUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6QyxtQkFBSyxNQUFMLENBQVksT0FBWixDQUFvQjtBQUFBLHFCQUFTLE1BQU0sS0FBTixDQUFZLFNBQVosQ0FBc0IsS0FBdEIsQ0FBVDtBQUFBLGFBQXBCO0FBQ0Q7QUFDRCxpQkFBSyxXQUFMLENBQWlCLE9BQUssS0FBdEIsRUFBNkIsT0FBSyxVQUFsQztBQUNBLHdCQUFjLFFBQWQ7QUFDRDtBQUNGLE9BWGdCLEVBV2QsSUFYYyxDQUFqQjs7QUFhQSxXQUFLLElBQUwsR0FBWSxLQUFLLFVBQUwsQ0FBZ0Isc0JBQVksR0FBNUIsRUFBaUMsc0JBQVksSUFBWixDQUFpQixJQUFsRCxDQUFaO0FBQ0EsV0FBSyxLQUFMLEdBQWEsS0FBSyxVQUFMLENBQWdCLElBQUksc0JBQVksR0FBaEMsRUFBcUMsc0JBQVksS0FBWixDQUFrQixJQUF2RCxDQUFiO0FBQ0EsV0FBSyxLQUFMLENBQVcsS0FBWCxHQUFtQixHQUFuQjs7QUFFQSxXQUFLLEtBQUwsR0FBYSxJQUFJLFNBQVMsSUFBYixDQUFrQixFQUFsQixFQUFzQixlQUF0QixFQUF1QyxNQUF2QyxDQUFiO0FBQ0EsV0FBSyxLQUFMLENBQVcsU0FBWCxHQUF1QixRQUF2QjtBQUNBLFdBQUssS0FBTCxDQUFXLFlBQVgsR0FBMEIsUUFBMUI7QUFDQSxXQUFLLEtBQUwsQ0FBVyxDQUFYLEdBQWUsS0FBSyxLQUFMLEdBQWEsQ0FBNUI7QUFDQSxXQUFLLEtBQUwsQ0FBVyxDQUFYLEdBQWUsR0FBZjtBQUNBLFdBQUssUUFBTCxDQUFjLEtBQUssS0FBbkI7O0FBRUEsV0FBSyxVQUFMLEdBQWtCLElBQUksU0FBUyxJQUFiLENBQWtCLEVBQWxCLEVBQXNCLGVBQXRCLEVBQXVDLE1BQXZDLENBQWxCO0FBQ0EsV0FBSyxVQUFMLENBQWdCLENBQWhCLEdBQW9CLEtBQUssTUFBTCxHQUFjLENBQWxDO0FBQ0EsV0FBSyxVQUFMLENBQWdCLENBQWhCLEdBQW9CLEtBQUssS0FBTCxHQUFhLENBQWpDO0FBQ0EsV0FBSyxVQUFMLENBQWdCLFNBQWhCLEdBQTRCLFFBQTVCO0FBQ0EsV0FBSyxVQUFMLENBQWdCLFlBQWhCLEdBQStCLFFBQS9CO0FBQ0EsV0FBSyxRQUFMLENBQWMsS0FBSyxVQUFuQjs7QUFFQSxXQUFLLEtBQUwsQ0FBVyxDQUFYLElBQWdCLEVBQWhCO0FBQ0EsV0FBSyxVQUFMLENBQWdCLENBQWhCLElBQXFCLEVBQXJCO0FBQ0EsY0FBUSxDQUFSLElBQWEsRUFBYjs7QUFFQSxjQUFRLHNCQUFZLFFBQXBCO0FBQ0UsYUFBSyxZQUFMO0FBQ0UsZUFBSyxLQUFMLENBQVcsSUFBWCxHQUFrQixlQUFsQjtBQUNBLGVBQUssVUFBTCxDQUFnQixJQUFoQixHQUF1QixrQkFBdkI7QUFDQSxlQUFLLFdBQUwsQ0FBaUIsQ0FBakIsR0FBcUIsS0FBSyxNQUFMLEdBQWMsS0FBSyxXQUFMLENBQWlCLENBQXBEO0FBQ0EsZUFBSyxXQUFMLENBQWlCLEtBQWpCLEdBQXlCLE1BQXpCO0FBQ0EsZUFBSyxDQUFMLEdBQVMsS0FBSyxNQUFkO0FBQ0Esa0JBQVEsQ0FBUixHQUFZLEdBQVo7QUFDQSxlQUFLLEtBQUwsQ0FBVyxDQUFYLElBQWdCLEVBQWhCO0FBQ0EsZUFBSyxVQUFMLENBQWdCLENBQWhCLElBQXFCLEVBQXJCO0FBQ0EsZUFBSyxNQUFMLEdBQWMsUUFBUSxNQUFSLEdBQWlCLEtBQUssVUFBTCxDQUFnQixNQUFoQixHQUF5QixLQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLEtBQUssV0FBTCxDQUFpQixNQUFqQixHQUEwQixDQUFDLENBQXZHO0FBQ0E7QUFDRixhQUFLLFVBQUw7QUFDRSxlQUFLLEtBQUwsQ0FBVyxJQUFYLEdBQWtCLFNBQWxCO0FBQ0EsZUFBSyxVQUFMLENBQWdCLElBQWhCLEdBQXVCLHFCQUF2QjtBQUNBLGVBQUssS0FBTCxDQUFXLENBQVgsR0FBZSxLQUFLLEtBQUwsR0FBYSxLQUFLLEtBQUwsQ0FBVyxDQUF2QztBQUNBLGVBQUssV0FBTCxDQUFpQixDQUFqQixHQUFxQixLQUFLLEtBQUwsR0FBYSxLQUFLLFdBQUwsQ0FBaUIsQ0FBbkQ7QUFDQSxlQUFLLENBQUwsR0FBUyxLQUFLLEtBQWQ7QUFDQSxlQUFLLE1BQUwsR0FBYyxRQUFRLE1BQVIsR0FBaUIsS0FBSyxJQUFMLENBQVUsTUFBVixHQUFtQixLQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLEtBQUssVUFBTCxDQUFnQixNQUFoQixHQUF5QixLQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLEtBQUssV0FBTCxDQUFpQixNQUFqQixHQUEwQixDQUFDLENBQTlJO0FBQ0E7QUFDRixhQUFLLE1BQUw7QUFDRSxlQUFLLEtBQUwsQ0FBVyxJQUFYLEdBQWtCLGlCQUFsQjtBQUNBLGVBQUssVUFBTCxDQUFnQixJQUFoQixHQUF1QiwwQkFBdkI7QUFDQSxlQUFLLEtBQUwsSUFBYyxDQUFkO0FBQ0EsZUFBSyxVQUFMLElBQW1CLElBQW5CO0FBQ0E7QUFDRixhQUFLLE1BQUw7QUFDRSxlQUFLLEtBQUwsQ0FBVyxJQUFYLEdBQWtCLGtCQUFsQjtBQUNBLGVBQUssVUFBTCxDQUFnQixJQUFoQixHQUF1Qix5QkFBdkI7QUFDQSxlQUFLLEtBQUwsSUFBYyxDQUFkO0FBQ0EsZUFBSyxVQUFMLElBQW1CLEtBQW5CO0FBQ0E7QUFDRixhQUFLLFlBQUw7QUFDRSxlQUFLLEtBQUwsQ0FBVyxJQUFYLEdBQWtCLGdCQUFsQjtBQUNBLGVBQUssVUFBTCxDQUFnQixJQUFoQixHQUF1QixxQkFBdkI7QUFDQSxlQUFLLE1BQUwsQ0FBWSxPQUFaLENBQW9CLFVBQUMsS0FBRCxFQUFRLENBQVIsRUFBYztBQUNoQyxrQkFBTSxLQUFOLEdBQWMsU0FBUyxLQUFULENBQWUsR0FBZixDQUFtQixLQUFuQixFQUEwQixFQUFFLE1BQU0sSUFBUixFQUFjLFFBQVEsSUFBdEIsRUFBMUIsRUFDWCxFQURXLENBQ1IsRUFBRSxPQUFPLENBQVQsRUFEUSxFQUNNLE1BQU0sSUFBSSxHQURoQixFQUVYLEVBRlcsQ0FFUixFQUFFLE9BQU8sQ0FBQyxDQUFWLEVBRlEsRUFFTyxPQUFPLElBQUksR0FGbEIsRUFHWCxFQUhXLENBR1IsRUFBRSxPQUFPLENBQVQsRUFIUSxFQUdNLE1BQU0sSUFBSSxHQUhoQixDQUFkO0FBSUQsV0FMRDtBQU1BO0FBQ0YsYUFBSyxLQUFMO0FBQ0UsZUFBSyxLQUFMLENBQVcsSUFBWCxHQUFrQixRQUFsQjtBQUNBLGVBQUssVUFBTCxDQUFnQixJQUFoQixHQUF1QixtQkFBdkI7QUFDQSxlQUFLLEtBQUwsSUFBYyxHQUFkO0FBQ0EsZUFBSyxHQUFMLEdBQVcsSUFBSSxTQUFTLEtBQWIsRUFBWDtBQUNBLGVBQUssR0FBTCxDQUFTLFFBQVQsQ0FDRyx1QkFESCxDQUVJLENBQUMsd0JBQUQsRUFBMkIsMEJBQTNCLEVBQXVELDBCQUF2RCxFQUFtRiwwQkFBbkYsRUFBK0csTUFBL0csQ0FGSixFQUdJLENBQUMsQ0FBRCxFQUFJLEdBQUosRUFBUyxHQUFULEVBQWMsR0FBZCxFQUFtQixDQUFuQixDQUhKLEVBRzJCLENBSDNCLEVBRzhCLENBSDlCLEVBR2lDLENBSGpDLEVBR29DLENBSHBDLEVBR3VDLENBSHZDLEVBRzBDLEdBSDFDLEVBSUcsUUFKSCxDQUlZLENBQUMsS0FBSyxLQUFOLEdBQWMsQ0FKMUIsRUFJNkIsQ0FBQyxLQUFLLE1BSm5DLEVBSTJDLEtBQUssS0FBTCxHQUFhLEdBSnhELEVBSTZELEtBQUssTUFBTCxHQUFjLENBSjNFO0FBS0EsZUFBSyxHQUFMLENBQVMsS0FBVCxDQUFlLENBQUMsS0FBSyxLQUFOLEdBQWMsQ0FBN0IsRUFBZ0MsQ0FBQyxLQUFLLE1BQXRDLEVBQThDLEtBQUssS0FBTCxHQUFhLEdBQTNELEVBQWdFLEtBQUssTUFBTCxHQUFjLENBQTlFO0FBQ0EsZUFBSyxHQUFMLENBQVMsQ0FBVCxHQUFhLEtBQUssSUFBTCxDQUFVLENBQXZCO0FBQ0EsZUFBSyxHQUFMLENBQVMsQ0FBVCxHQUFhLEtBQUssSUFBTCxDQUFVLENBQXZCO0FBQ0EsZUFBSyxHQUFMLENBQVMsZ0JBQVQsQ0FBMEIsTUFBMUIsRUFBa0MsWUFBTTtBQUN0QyxnQkFBSSxDQUFDLE9BQUssSUFBTCxDQUFVLElBQWYsRUFBcUI7QUFDbkIscUJBQUssR0FBTCxDQUFTLENBQVQsR0FBYSxPQUFLLElBQUwsQ0FBVSxDQUF2QjtBQUNEO0FBQ0YsV0FKRDtBQUtBLGVBQUssUUFBTCxDQUFjLEtBQUssR0FBbkIsRUFBd0IsS0FBSyxXQUE3QixFQUEwQyxPQUExQztBQUNBO0FBN0RKO0FBK0RBLFdBQUssTUFBTCxDQUFZLE9BQVosQ0FBb0I7QUFBQSxlQUFTLE9BQUssVUFBTCxDQUFnQixLQUFoQixDQUFUO0FBQUEsT0FBcEI7QUFDRDs7OytCQUNVO0FBQ1QsV0FBSyxLQUFMLEdBQWEseUJBQWUsS0FBZixFQUFzQixLQUFLLEtBQTNCLENBQWI7QUFDQSxXQUFLLFVBQUwsR0FBa0IseUJBQWUsVUFBZixFQUEyQixLQUFLLEtBQWhDLENBQWxCO0FBQ0EsV0FBSyxRQUFMLEdBQWdCLHlCQUFlLFFBQWYsRUFBeUIsS0FBSyxLQUE5QixDQUFoQjtBQUNBLFdBQUssS0FBTCxDQUFXLENBQVgsR0FBZSxLQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsR0FBb0IsS0FBSyxRQUFMLENBQWMsQ0FBZCxHQUFrQixLQUFLLE1BQTFEO0FBQ0EsV0FBSyxRQUFMLENBQWMsS0FBSyxLQUFuQixFQUEwQixLQUFLLFVBQS9CLEVBQTJDLEtBQUssUUFBaEQ7QUFDRDs7O21DQUNjO0FBQ2IsV0FBSyxNQUFMLEdBQWMsQ0FBQyxxQkFBRCxFQUFjLHFCQUFkLENBQWQ7QUFDQSxXQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWUsQ0FBZixHQUFtQixDQUFDLEtBQUssTUFBTCxDQUFZLENBQVosRUFBZSxNQUFmLENBQXNCLEtBQXZCLEdBQStCLENBQWxEO0FBQ0EsV0FBSyxNQUFMLENBQVksQ0FBWixFQUFlLENBQWYsR0FBbUIsS0FBSyxLQUFMLEdBQWEsQ0FBaEM7QUFDQSxXQUFLLFFBQUwsZ0NBQWlCLEtBQUssTUFBdEI7QUFDRDs7OytCQUNVLEcsRUFBSyxJLEVBQU07QUFBQTs7QUFDcEIsVUFBTSxPQUFPLG1CQUFTLHNCQUFZLFFBQXJCLENBQWI7QUFDQSxXQUFLLENBQUwsR0FBUyxLQUFLLEtBQUwsR0FBYSxDQUFiLEdBQWlCLE1BQU0sR0FBaEM7QUFDQSxXQUFLLENBQUwsR0FBUyxNQUFNLEtBQUssR0FBcEI7O0FBRUEsVUFBTSxXQUFXLElBQUksU0FBUyxJQUFiLENBQWtCLElBQWxCLEVBQXdCLGVBQXhCLEVBQXlDLE1BQXpDLENBQWpCO0FBQ0EsZUFBUyxTQUFULEdBQXFCLFFBQXJCO0FBQ0EsZUFBUyxDQUFULEdBQWEsS0FBSyxDQUFMLEdBQVMsR0FBdEI7QUFDQSxlQUFTLENBQVQsR0FBYSxLQUFLLENBQWxCO0FBQ0EsVUFBSSxzQkFBWSxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDLGlCQUFTLE1BQVQsR0FBa0IsQ0FBQyxDQUFuQjtBQUNBLGlCQUFTLENBQVQsSUFBYyxFQUFkO0FBQ0Q7QUFDRCxVQUFJLHNCQUFZLFFBQVosS0FBeUIsVUFBN0IsRUFBeUM7QUFDdkMsaUJBQVMsTUFBVCxHQUFrQixDQUFDLENBQW5CO0FBQ0Q7QUFDRCxXQUFLLFFBQUwsQ0FBYyxJQUFkLEVBQW9CLFFBQXBCOztBQUVBLGVBQVMsS0FBVCxDQUFlLEdBQWYsQ0FBbUIsUUFBbkIsRUFBNkIsSUFBN0IsQ0FBa0MsSUFBbEMsRUFBd0MsRUFBeEMsQ0FBMkMsRUFBRSxPQUFPLENBQVQsRUFBM0MsRUFBeUQsR0FBekQsRUFDRyxJQURILENBQ1E7QUFBQSxlQUFNLE9BQUssV0FBTCxDQUFpQixRQUFqQixDQUFOO0FBQUEsT0FEUjs7QUFHQSxhQUFPLElBQVA7QUFDRDs7O2dDQUNXO0FBQ1YsV0FBSyxXQUFMLEdBQW1CLElBQUksU0FBUyxJQUFiLENBQWtCLEtBQWxCLEVBQXlCLGVBQXpCLEVBQTBDLE1BQTFDLENBQW5CO0FBQ0EsV0FBSyxXQUFMLENBQWlCLENBQWpCLEdBQXFCLEVBQXJCO0FBQ0EsV0FBSyxXQUFMLENBQWlCLENBQWpCLEdBQXFCLEVBQXJCO0FBQ0EsV0FBSyxRQUFMLENBQWMsS0FBSyxXQUFuQjtBQUNEOzs7K0JBQ1UsSyxFQUFPO0FBQ2hCLFlBQU0sQ0FBTixJQUFXLEtBQUssS0FBTCxHQUFhLE1BQU0sTUFBTixDQUFhLEtBQXJDOztBQUVBLFVBQUksS0FBSyxXQUFMLENBQWlCLEtBQUssVUFBdEIsQ0FBSixFQUF1QztBQUNyQyxjQUFNLE1BQU4sR0FBZSxLQUFLLFdBQUwsQ0FBaUIsS0FBSyxVQUF0QixDQUFmO0FBQ0EsYUFBSyxVQUFMLElBQW1CLENBQW5COztBQUVBLFlBQUksTUFBTSxNQUFOLEdBQWUsQ0FBbkIsRUFBc0I7QUFDcEIsZ0JBQU0sQ0FBTixHQUFVLEtBQUssTUFBTCxHQUFjLGFBQXhCO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsZ0JBQU0sQ0FBTixHQUFVLENBQVY7QUFDRDtBQUNGLE9BVEQsTUFTTztBQUNMLGNBQU0sTUFBTixHQUFlLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTCxLQUFnQixJQUF2QixFQUE2QixPQUE3QixDQUFxQyxDQUFyQyxDQUFoQjtBQUNBLFlBQUksS0FBSyxNQUFMLEtBQWdCLEdBQXBCLEVBQXlCO0FBQ3ZCLGdCQUFNLENBQU4sR0FBVSxLQUFLLE1BQUwsR0FBYyxhQUF4QjtBQUNELFNBRkQsTUFFTztBQUNMLGdCQUFNLENBQU4sR0FBVSxDQUFWO0FBQ0EsZ0JBQU0sTUFBTixHQUFlLENBQUMsTUFBTSxNQUF0QjtBQUNEO0FBQ0Y7QUFDRCw0QkFBWSxNQUFaLENBQW1CLElBQW5CLENBQXdCLE1BQU0sTUFBOUI7QUFDRDs7O2lDQUNZO0FBQUE7O0FBQ1gsV0FBSyxnQkFBTCxDQUFzQixPQUF0QixFQUErQjtBQUFBLGVBQU0sT0FBSyxZQUFMLEVBQU47QUFBQSxPQUEvQjtBQUNBLFdBQUssU0FBTCxHQUFpQixhQUFLO0FBQ3BCLGVBQUssWUFBTDtBQUNBLFVBQUUsY0FBRjtBQUNELE9BSEQ7O0FBS0EsYUFBTyxnQkFBUCxDQUF3QixTQUF4QixFQUFtQyxLQUFLLFNBQXhDO0FBQ0Q7OzttQ0FDYztBQUNiLFVBQUksQ0FBQyxLQUFLLE9BQVYsRUFBbUI7QUFDakI7QUFDRDtBQUNELFdBQUssSUFBTCxDQUFVLElBQVY7QUFDQSw0QkFBWSxPQUFaLENBQW9CLEtBQUssSUFBekIsSUFBaUMsQ0FBakM7QUFDRDs7O2dDQUNXO0FBQ1YsV0FBSyxVQUFMLENBQWdCLEtBQUssS0FBckI7QUFDQSxXQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLEtBQUssS0FBTCxHQUFhLEdBQTdCO0FBQ0EsV0FBSyxVQUFMLENBQWdCLElBQWhCLENBQXFCLEtBQUssS0FBTCxHQUFhLEdBQWxDO0FBQ0EsV0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixLQUFLLEtBQXhCOztBQUVBLFdBQUssUUFBTCxJQUFpQixLQUFLLEtBQXRCO0FBQ0EsNEJBQVksS0FBWixHQUFvQixLQUFLLEtBQUwsQ0FBVyxLQUFLLFFBQUwsR0FBZ0IsRUFBM0IsQ0FBcEI7QUFDQSxXQUFLLFdBQUwsQ0FBaUIsSUFBakIsR0FBMkIsc0JBQVksS0FBdkM7QUFDRDs7O2lDQUNZO0FBQUE7O0FBQ1gsV0FBSyxNQUFMLENBQVksT0FBWixDQUFvQixpQkFBUztBQUMzQixjQUFNLENBQU4sSUFBVyxPQUFLLEtBQWhCO0FBQ0EsWUFBSSxNQUFNLENBQU4sR0FBVSxDQUFDLE1BQU0sTUFBTixDQUFhLEtBQWQsR0FBc0IsQ0FBcEMsRUFBdUM7QUFDckMsaUJBQUssVUFBTCxDQUFnQixLQUFoQjtBQUNBLGlCQUFLLEtBQUwsSUFBYyxJQUFkO0FBQ0Q7QUFDRixPQU5EO0FBT0Q7Ozs2QkFDUSxJLEVBQU07QUFDYixXQUFLLElBQUw7QUFDQSxVQUFJLEtBQUssQ0FBTCxHQUFTLENBQWIsRUFBZ0I7QUFDZCxhQUFLLEVBQUwsR0FBVSxDQUFWO0FBQ0EsYUFBSyxDQUFMLEdBQVMsQ0FBVDtBQUNELE9BSEQsTUFHTyxJQUFJLEtBQUssQ0FBTCxHQUFTLEtBQUssTUFBTCxHQUFjLEtBQUssTUFBTCxDQUFZLE1BQVosR0FBcUIsQ0FBaEQsRUFBbUQ7QUFDeEQsWUFBSSxTQUFTLEtBQUssSUFBbEIsRUFBd0I7QUFDdEIsbUNBQWUsTUFBZixDQUFzQixXQUF0QjtBQUNELFNBRkQsTUFFTztBQUNMLGdDQUFZLEdBQVosR0FBa0IsSUFBbEI7QUFDRDtBQUNGLE9BTk0sTUFNQSxJQUFJLEtBQUssQ0FBTCxHQUFTLEtBQUssTUFBTCxJQUFlLGdCQUFnQixLQUFLLE1BQUwsQ0FBWSxNQUFaLEdBQXFCLENBQXBELENBQWIsRUFBcUU7QUFDMUUsYUFBSyxHQUFMO0FBQ0Q7QUFDRCxVQUFJLEtBQUssTUFBTCxDQUFZLElBQVosQ0FBaUI7QUFBQSxlQUFTLE1BQU0sbUJBQU4sQ0FBMEIsSUFBMUIsRUFBZ0MsS0FBaEMsQ0FBVDtBQUFBLE9BQWpCLENBQUosRUFBdUU7QUFDckUsYUFBSyxHQUFMO0FBQ0Q7QUFDRjs7OzJCQUNNO0FBQ0wsVUFBSSxDQUFDLEtBQUssT0FBVixFQUFtQjtBQUNqQjtBQUNEO0FBQ0QsV0FBSyxTQUFMO0FBQ0EsV0FBSyxRQUFMLENBQWMsS0FBSyxJQUFuQjtBQUNBLFdBQUssUUFBTCxDQUFjLEtBQUssS0FBbkI7O0FBRUEsV0FBSyxJQUFMLElBQWEsQ0FBYjtBQUNBLFVBQUksS0FBSyxZQUFMLENBQWtCLEtBQUssSUFBdkIsQ0FBSixFQUFrQztBQUNoQyxhQUFLLEtBQUwsQ0FBVyxJQUFYO0FBQ0Q7QUFDRjs7OzhCQUNTO0FBQ1IsYUFBTyxtQkFBUCxDQUEyQixTQUEzQixFQUFzQyxLQUFLLFNBQTNDO0FBQ0Q7Ozs7RUE5VHFDLFNBQVMsUzs7a0JBQTVCLFU7Ozs7Ozs7Ozs7O0FDWnJCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUIsWTs7O0FBQ25CLHdCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFHakIsVUFBSyxLQUFMLEdBQWEsS0FBYjs7QUFFQSxVQUFLLEVBQUwsR0FBVSxJQUFJLFNBQVMsTUFBYixDQUFvQix3QkFBYyxTQUFkLENBQXdCLE9BQXhCLENBQXBCLENBQVY7QUFDQSxVQUFLLEdBQUwsR0FBVyxrQkFBUSxLQUFSLENBQVg7O0FBRUEsVUFBSyxLQUFMLEdBQWEsSUFBSSxTQUFTLElBQWIsQ0FBa0IsU0FBbEIsRUFBNkIsZUFBN0IsRUFBOEMsTUFBOUMsQ0FBYjtBQUNBLFVBQUssS0FBTCxDQUFXLFNBQVgsR0FBdUIsUUFBdkI7QUFDQSxVQUFLLEtBQUwsQ0FBVyxDQUFYLEdBQWUsTUFBSyxLQUFMLEdBQWEsQ0FBNUI7QUFDQSxVQUFLLEtBQUwsQ0FBVyxDQUFYLEdBQWUsRUFBZjs7QUFFQSxVQUFLLFFBQUwsQ0FBYyxNQUFLLEVBQW5CLEVBQXVCLE1BQUssR0FBNUIsRUFBaUMsTUFBSyxLQUF0Qzs7QUFFQSw0QkFBYyxHQUFkLENBQWtCLGFBQWxCLEVBQWlDLENBQWpDO0FBQ0U7QUFERixLQUVHLElBRkgsQ0FFUSxpQkFGUixFQUdHLElBSEgsQ0FHUTtBQUFBLGFBQUssTUFBSyxVQUFMLENBQWdCLENBQWhCLENBQUw7QUFBQSxLQUhSLEVBSUcsS0FKSCxDQUlTLFlBQU07QUFDWCxVQUFNLE9BQU8sSUFBSSxTQUFTLElBQWIsQ0FBa0IsZ0NBQWxCLEVBQW9ELGVBQXBELEVBQXFFLE1BQXJFLENBQWI7QUFDQSxXQUFLLFNBQUwsR0FBaUIsUUFBakI7QUFDQSxXQUFLLENBQUwsR0FBUyxNQUFLLEtBQUwsR0FBYSxDQUF0QjtBQUNBLFdBQUssQ0FBTCxHQUFTLEdBQVQ7QUFDQSxZQUFLLFFBQUwsQ0FBYyxJQUFkO0FBQ0QsS0FWSDtBQWZpQjtBQTBCbEI7Ozs7K0JBQ1UsVyxFQUFhO0FBQUE7O0FBQ3RCLFVBQUksU0FBUyxLQUFiOztBQUVBLGtCQUFZLE9BQVosQ0FBb0IsVUFBQyxFQUFELEVBQUssQ0FBTCxFQUFXO0FBQzdCLFlBQU0sT0FBTyxJQUFJLFNBQVMsSUFBYixDQUFxQixJQUFJLENBQXpCLFNBQThCLEdBQUcsSUFBakMsU0FBeUMsR0FBRyxLQUE1QyxjQUF1RCxlQUF2RCxFQUF3RSxNQUF4RSxDQUFiO0FBQ0EsYUFBSyxDQUFMLEdBQVMsTUFBTSxJQUFJLEVBQW5CO0FBQ0EsYUFBSyxDQUFMLEdBQVMsR0FBVDtBQUNBLGVBQUssUUFBTCxDQUFjLElBQWQ7O0FBRUEsWUFBSSxHQUFHLEVBQUgsS0FBVSxzQkFBWSxJQUFaLENBQWlCLEVBQS9CLEVBQW1DO0FBQ2pDLG1CQUFTLElBQVQ7QUFDQSxlQUFLLEtBQUwsR0FBYSxTQUFiO0FBQ0Q7QUFDRixPQVZEOztBQVlBLFVBQUksQ0FBQyxNQUFMLEVBQWE7QUFDWCxZQUFNLE9BQU8sSUFBSSxTQUFTLElBQWIsUUFBdUIsc0JBQVksSUFBWixDQUFpQixJQUF4QyxTQUFnRCxzQkFBWSxRQUE1RCxjQUEwRSxlQUExRSxFQUEyRixTQUEzRixDQUFiO0FBQ0EsYUFBSyxDQUFMLEdBQVMsTUFBTSxZQUFZLE1BQVosR0FBcUIsRUFBcEM7QUFDQSxhQUFLLENBQUwsR0FBUyxHQUFUO0FBQ0EsYUFBSyxRQUFMLENBQWMsSUFBZDtBQUNEO0FBQ0Y7Ozs7RUFqRHVDLFNBQVMsUzs7a0JBQTlCLFk7OztBQW9EckIsU0FBUyxpQkFBVCxDQUEyQixXQUEzQixFQUF3QztBQUN0QyxNQUFJLFlBQVksWUFBWSxNQUFaLEdBQXFCLENBQWpDLEVBQW9DLEtBQXBDLEdBQTRDLHNCQUFZLFFBQTVELEVBQXNFO0FBQ3BFLFFBQU0sYUFBYSxZQUFZLElBQVosQ0FBaUI7QUFBQSxhQUFNLEdBQUcsRUFBSCxLQUFVLHNCQUFZLElBQVosQ0FBaUIsRUFBakM7QUFBQSxLQUFqQixDQUFuQjs7QUFFQSxRQUFJLFVBQUosRUFBZ0I7QUFDZCxpQkFBVyxLQUFYLEdBQW1CLHNCQUFZLFFBQS9CO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsVUFBTSxZQUFZO0FBQ2hCLFlBQUksc0JBQVksSUFBWixDQUFpQixFQURMO0FBRWhCLGNBQU0sc0JBQVksSUFBWixDQUFpQixJQUZQO0FBR2hCLGVBQU8sc0JBQVk7QUFISCxPQUFsQjtBQUtBLFVBQUksWUFBWSxNQUFaLEdBQXFCLEVBQXpCLEVBQTZCO0FBQzNCLG9CQUFZLElBQVosQ0FBaUIsU0FBakI7QUFDRCxPQUZELE1BRU87QUFDTCxvQkFBWSxZQUFZLE1BQVosR0FBcUIsQ0FBakMsSUFBc0MsU0FBdEM7QUFDRDtBQUNGOztBQUVELGdCQUFZLElBQVosQ0FBaUIsVUFBQyxDQUFELEVBQUksQ0FBSjtBQUFBLGFBQVUsRUFBRSxLQUFGLEdBQVUsRUFBRSxLQUF0QjtBQUFBLEtBQWpCO0FBQ0EsNEJBQWMsR0FBZCxDQUFrQixhQUFsQixFQUFpQyxXQUFqQyxFQUE4QyxDQUE5QztBQUNEO0FBQ0QsU0FBTyxXQUFQO0FBQ0Q7Ozs7Ozs7Ozs7O0FDaEZEOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUIsVzs7O0FBQ25CLHVCQUFZLEtBQVosRUFBbUIsTUFBbkIsRUFBMkI7QUFBQTs7QUFBQTs7QUFHekIsVUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLFVBQUssTUFBTCxHQUFjLE1BQWQ7O0FBRUEsVUFBSyxFQUFMLEdBQVUsSUFBSSxTQUFTLE1BQWIsQ0FBb0Isd0JBQWMsU0FBZCxDQUF3QixPQUF4QixDQUFwQixDQUFWO0FBQ0EsVUFBSyxHQUFMLEdBQVcsa0JBQVEsS0FBUixDQUFYOztBQUVBLFVBQUssUUFBTCxHQUFnQixrQkFBUSxRQUFSLENBQWhCO0FBQ0EsVUFBSyxRQUFMLENBQWMsQ0FBZCxHQUFrQixRQUFRLENBQTFCO0FBQ0EsVUFBSyxRQUFMLENBQWMsQ0FBZCxHQUFrQixHQUFsQjs7QUFFQSxVQUFLLE1BQUwsR0FBYyxrQkFBUSxLQUFSLENBQWQ7QUFDQSxVQUFLLE1BQUwsQ0FBWSxDQUFaLEdBQWdCLFFBQVEsQ0FBeEI7QUFDQSxVQUFLLE1BQUwsQ0FBWSxDQUFaLEdBQWdCLEdBQWhCOztBQUVBLFVBQUssU0FBTCxHQUFpQixrQkFBUSxhQUFSLEVBQXVCLFFBQXZCLENBQWpCO0FBQ0EsVUFBSyxTQUFMLENBQWUsQ0FBZixHQUFtQixRQUFRLENBQTNCO0FBQ0EsVUFBSyxTQUFMLENBQWUsQ0FBZixHQUFtQixHQUFuQjs7QUFFQSxVQUFLLElBQUwsR0FBWSxtQkFBUyxTQUFULENBQVo7QUFDQSxVQUFLLElBQUwsQ0FBVSxDQUFWLEdBQWMsUUFBUSxDQUF0QjtBQUNBLFVBQUssSUFBTCxDQUFVLENBQVYsR0FBYyxHQUFkOztBQUVBLFVBQUssUUFBTCxDQUFjLE1BQUssRUFBbkIsRUFBdUIsTUFBSyxHQUE1QixFQUFpQyxNQUFLLElBQXRDLEVBQTRDLE1BQUssUUFBakQsRUFBMkQsTUFBSyxNQUFoRSxFQUF3RSxNQUFLLFNBQTdFOztBQUVBLFFBQUksc0JBQVksUUFBaEIsRUFBMEI7QUFDeEIsWUFBSyxLQUFMLEdBQWEsSUFBSSxTQUFTLElBQWIsNENBQTZCLHNCQUFZLFFBQXpDLGNBQXVELGVBQXZELEVBQXdFLE1BQXhFLENBQWI7QUFDQSxZQUFLLEtBQUwsQ0FBVyxTQUFYLEdBQXVCLFFBQXZCO0FBQ0EsWUFBSyxLQUFMLENBQVcsQ0FBWCxHQUFlLE1BQUssS0FBTCxHQUFhLENBQTVCO0FBQ0EsWUFBSyxLQUFMLENBQVcsQ0FBWCxHQUFlLEVBQWY7QUFDQSxZQUFLLFFBQUwsQ0FBYyxNQUFLLEtBQW5CO0FBQ0Q7O0FBRUQsVUFBSyxVQUFMO0FBbkN5QjtBQW9DMUI7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7aUNBQ2E7QUFDWCxXQUFLLFFBQUwsQ0FBYyxnQkFBZCxDQUErQixPQUEvQixFQUF3QztBQUFBLGVBQ3RDLHlCQUFlLE1BQWYsQ0FBc0IsWUFBdEIsQ0FEc0M7QUFBQSxPQUF4QztBQUVBLFdBQUssTUFBTCxDQUFZLGdCQUFaLENBQTZCLE9BQTdCLEVBQXNDO0FBQUEsZUFDcEMseUJBQWUsTUFBZixDQUFzQixXQUF0QixDQURvQztBQUFBLE9BQXRDO0FBRUEsV0FBSyxTQUFMLENBQWUsZ0JBQWYsQ0FBZ0MsT0FBaEMsRUFBeUM7QUFBQSxlQUN2Qyx3QkFBYyxNQUFkLEVBRHVDO0FBQUEsT0FBekM7O0FBR0EsV0FBSyxTQUFMLEdBQWlCLGFBQUs7QUFDcEIsWUFBSSxFQUFFLE9BQUYsS0FBYyxFQUFsQixFQUFzQjtBQUNwQixtQ0FBZSxNQUFmLENBQXNCLFlBQXRCO0FBQ0EsWUFBRSxjQUFGO0FBQ0Q7QUFDRixPQUxEOztBQU9BLGFBQU8sZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUMsS0FBSyxTQUF4QztBQUNEOzs7OEJBQ1M7QUFDUixhQUFPLG1CQUFQLENBQTJCLFNBQTNCLEVBQXNDLEtBQUssU0FBM0M7QUFDRDs7OztFQWpHc0MsU0FBUyxTOztrQkFBN0IsVzs7O0FDUnJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHNjcmVlbnNNYW5hZ2VyIGZyb20gJy4vbWFuYWdlcnMvc2NyZWVuc01hbmFnZXInO1xuaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcbmltcG9ydCBzZXJ2ZXJNYW5hZ2VyIGZyb20gJy4vbWFuYWdlcnMvc2VydmVyTWFuYWdlcic7XG5pbXBvcnQgc291bmRNYW5hZ2VyIGZyb20gJy4vbWFuYWdlcnMvc291bmRNYW5hZ2VyJztcbmltcG9ydCBkYXRhTWFuYWdlciBmcm9tICcuL21hbmFnZXJzL2RhdGFNYW5hZ2VyJztcblxuUHJvbWlzZS5hbGwoW1xuICBhc3NldHNNYW5hZ2VyLmluaXQoKSxcbiAgc2VydmVyTWFuYWdlci5pbml0KCksXG5dKVxuICAudGhlbigoKSA9PiBQcm9taXNlLmFsbChbXG4gICAgc2VydmVyTWFuYWdlci5nZXRVc2VyKCkudGhlbih1c2VyID0+IGRhdGFNYW5hZ2VyLnNldCgndXNlcicsIHtcbiAgICAgIGlkOiB1c2VyLmlkLFxuICAgICAgbmFtZTogYCR7dXNlci5maXJzdF9uYW1lfSAke3VzZXIubGFzdF9uYW1lfWAsXG4gICAgICBzZXg6IHVzZXIuc2V4LFxuICAgIH0pKSxcbiAgICBzZXJ2ZXJNYW5hZ2VyLmdldCgnbWF4U2NvcmUnKS50aGVuKHIgPT4gZGF0YU1hbmFnZXIuc2V0KCdtYXhTY29yZScsICtyKSksXG4gICAgc2VydmVyTWFuYWdlci5nZXQoJ3NvdW5kJykudGhlbihyID0+IHNvdW5kTWFuYWdlci5pbml0KHIgPT09ICcnID8gdHJ1ZSA6ICEhcikpLFxuICBdKSlcbiAgLnRoZW4oKCkgPT4gc2NyZWVuc01hbmFnZXIuY2hhbmdlKCdTdGFydFNjcmVlbicpKVxuICAuY2F0Y2goZSA9PiBjb25zb2xlLmVycm9yKCdpbml0IGVycm9yLCByZWxvYWQgcGFnZScsIGUpKTtcblxuY29uc3Qgc3RhZ2UgPSBuZXcgY3JlYXRlanMuU3RhZ2UoJ2dhbWUtc3RhZ2UnKTtcbnNjcmVlbnNNYW5hZ2VyLmluaXQoc3RhZ2UpO1xuXG5pZiAoY3JlYXRlanMuVG91Y2guaXNTdXBwb3J0ZWQoKSkge1xuICBjcmVhdGVqcy5Ub3VjaC5lbmFibGUoc3RhZ2UsIHRydWUpO1xufSBlbHNlIHtcbiAgc3RhZ2UuZW5hYmxlTW91c2VPdmVyKDIwKTtcbn1cblxuaWYgKHdpbmRvdyAhPT0gd2luZG93LnBhcmVudCkge1xuICAvLyBjcmVhdGVqcyBzdGFnZSBjbGljayBkb3NudCB0cmlnZ2VyIHdpbmRvdy5mb2N1c1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB3aW5kb3cuZm9jdXMoKSk7XG59XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFja2dyb3VuZCBleHRlbmRzIGNyZWF0ZWpzLlNoYXBlIHtcbiAgY29uc3RydWN0b3IobmFtZSwgY2FudmFzV2lkdGgpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5pbWcgPSBhc3NldHNNYW5hZ2VyLmdldFJlc3VsdChuYW1lKTtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuaW1nLndpZHRoICsgY2FudmFzV2lkdGg7XG5cbiAgICB0aGlzLmdyYXBoaWNzLmJlZ2luQml0bWFwRmlsbCh0aGlzLmltZywgJ3JlcGVhdC14JykuZHJhd1JlY3QoMCwgMCwgd2lkdGgsIHRoaXMuaW1nLmhlaWdodCk7XG4gICAgdGhpcy5yZWdZID0gdGhpcy5pbWcuaGVpZ2h0O1xuICAgIHRoaXMuY2FjaGUoMCwgMCwgd2lkdGgsIHRoaXMuaW1nLmhlaWdodCk7XG4gIH1cbiAgbW92ZShwYXRoKSB7XG4gICAgdGhpcy54IC09IHBhdGg7XG4gICAgdGhpcy54ICU9IHRoaXMuaW1nLndpZHRoO1xuICB9XG59XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcbmltcG9ydCBzb3VuZE1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc291bmRNYW5hZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnRuIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IobGFiZWwsIGNvbG9yID0gJ2dyZWVuJywgdHlwZSA9ICdidG4nKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcblxuICAgIHRoaXMuY3JlYXRlQmcodHlwZSk7XG4gICAgdGhpcy5jcmVhdGVMYWJlbChsYWJlbCk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gc291bmRNYW5hZ2VyLnBsYXkoJ2ZsYXAnKSk7XG4gIH1cbiAgY3JlYXRlQmcodHlwZSkge1xuICAgIHRoaXMuYmcgPSBuZXcgY3JlYXRlanMuU3ByaXRlKGFzc2V0c01hbmFnZXIuZ2V0U3ByaXRlU2hlZXQodHlwZSkpO1xuICAgIHRoaXMuYmcucmVnWCA9IHRoaXMuYmcuZ2V0Qm91bmRzKCkud2lkdGggLyAyO1xuICAgIHRoaXMuYmcucmVnWSA9IHRoaXMuYmcuZ2V0Qm91bmRzKCkuaGVpZ2h0IC8gMjtcbiAgICB0aGlzLmhlbHBlciA9IG5ldyBjcmVhdGVqcy5CdXR0b25IZWxwZXIodGhpcy5iZywgYCR7dGhpcy5jb2xvcn1PdXRgLCBgJHt0aGlzLmNvbG9yfU92ZXJgLCBgJHt0aGlzLmNvbG9yfURvd25gKTtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuYmcpO1xuICB9XG4gIGNyZWF0ZUxhYmVsKGxhYmVsKSB7XG4gICAgdGhpcy5sYWJlbCA9IG5ldyBjcmVhdGVqcy5UZXh0KGxhYmVsLCAnMzBweCBHdWVyaWxsYScsICcjZmZmJyk7XG4gICAgdGhpcy5sYWJlbC5zaGFkb3cgPSBuZXcgY3JlYXRlanMuU2hhZG93KCcjMDAwJywgMCwgMSwgNSk7XG4gICAgdGhpcy5sYWJlbC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICB0aGlzLmxhYmVsLnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuICAgIHRoaXMubGFiZWwubW91c2VFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5sYWJlbC55ID0gLTM7XG5cbiAgICAvLyB0b2RvIGNhY2hlXG4gICAgLy8gbm93IGl0IGNhY2hlIGJlZm9yZSBmb250IGxvYWQgKFxuICAgIC8vIGNvbnN0IGggPSB0aGlzLmxhYmVsLmdldE1lYXN1cmVkSGVpZ2h0KCkgKyA2OyAvLyBhZGQgNiBjb3Mgb2Ygc2hhZG93XG4gICAgLy8gY29uc3QgdyA9IHRoaXMubGFiZWwuZ2V0TWVhc3VyZWRXaWR0aCgpICsgNjtcbiAgICAvLyB0aGlzLmxhYmVsLmNhY2hlKC13IC8gMiwgLWggLyAyLCB3LCBoKTtcblxuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5sYWJlbCk7XG4gIH1cbiAgZGlzYWJsZSgpIHtcbiAgICB0aGlzLmJnLmdvdG9BbmRTdG9wKCdkaXNhYmxlJyk7XG4gICAgdGhpcy5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgfVxuICBlbmFibGUoKSB7XG4gICAgdGhpcy5iZy5nb3RvQW5kU3RvcChgJHt0aGlzLmNvbG9yfU91dGApO1xuICAgIHRoaXMubW91c2VFbmFibGVkID0gdHJ1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHNjcmVlbk1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc2NyZWVuc01hbmFnZXInO1xuaW1wb3J0IHNvdW5kTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zb3VuZE1hbmFnZXInO1xuaW1wb3J0IHNlcnZlck1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc2VydmVyTWFuYWdlcic7XG5pbXBvcnQgSWNvbkJ0biBmcm9tICcuL0ljb25CdG4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHdWkgZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3Rvcih3aWR0aCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG5cbiAgICB0aGlzLm1lbnVCdG4gPSBuZXcgSWNvbkJ0bignbWVudScpO1xuICAgIHRoaXMubWVudUJ0bi54ID0gdGhpcy5tZW51QnRuLmdldEJvdW5kcygpLndpZHRoIC8gMiArIDIwO1xuICAgIHRoaXMubWVudUJ0bi55ID0gdGhpcy5tZW51QnRuLmdldEJvdW5kcygpLmhlaWdodCAvIDIgKyAyMDtcblxuICAgIHRoaXMucmF0aW5nQnRuID0gbmV3IEljb25CdG4oJ3JhdGluZycpO1xuICAgIHRoaXMucmF0aW5nQnRuLnggPSB0aGlzLnJhdGluZ0J0bi5nZXRCb3VuZHMoKS53aWR0aCAqIDMgLyAyICsgNDA7XG4gICAgdGhpcy5yYXRpbmdCdG4ueSA9IHRoaXMucmF0aW5nQnRuLmdldEJvdW5kcygpLmhlaWdodCAvIDIgKyAyMDtcblxuICAgIHRoaXMuc291bmRCdG4gPSBuZXcgSWNvbkJ0bihzb3VuZE1hbmFnZXIuaXNFbmFibGVkKCkgPyAnc291bmQnIDogJ3NvdW5kT2ZmJyk7XG4gICAgdGhpcy5zb3VuZEJ0bi54ID0gdGhpcy53aWR0aCAtIHRoaXMuc291bmRCdG4uZ2V0Qm91bmRzKCkud2lkdGggLyAyIC0gMjA7XG4gICAgdGhpcy5zb3VuZEJ0bi55ID0gdGhpcy5zb3VuZEJ0bi5nZXRCb3VuZHMoKS5oZWlnaHQgLyAyICsgMjA7XG5cbiAgICAvLyB0b2RvOiBmaXggc3ByaXRlc2hlZXQgbGF0ZXJcbiAgICB0aGlzLnJhdGluZ0J0bi5sYWJlbC54ID0gdGhpcy5zb3VuZEJ0bi5sYWJlbC54ID0gMTtcblxuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5tZW51QnRuLCB0aGlzLnJhdGluZ0J0biwgdGhpcy5zb3VuZEJ0bik7XG5cbiAgICB0aGlzLnNvdW5kQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgc291bmRNYW5hZ2VyLnRvZ2dsZSgpO1xuICAgICAgdGhpcy5zb3VuZEJ0bi5jaGFuZ2VMYWJlbChzb3VuZE1hbmFnZXIuaXNFbmFibGVkKCkgPyAnc291bmQnIDogJ3NvdW5kT2ZmJyk7XG4gICAgICBzZXJ2ZXJNYW5hZ2VyLnNldCgnc291bmQnLCBzb3VuZE1hbmFnZXIuaXNFbmFibGVkKCkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5tZW51QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gc2NyZWVuTWFuYWdlci5jaGFuZ2UoJ1N0YXJ0U2NyZWVuJykpO1xuICAgIHRoaXMucmF0aW5nQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gc2NyZWVuTWFuYWdlci5jaGFuZ2UoJ1JhdGluZ1NjcmVlbicpKTtcbiAgfVxufVxuIiwiaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5pbXBvcnQgc291bmRNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NvdW5kTWFuYWdlcic7XG5cbmNvbnN0IENPTkZJRyA9IHtcbiAgRzogMC4xNixcbiAgQTogNyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlcm8gZXh0ZW5kcyBjcmVhdGVqcy5TcHJpdGUge1xuICBjb25zdHJ1Y3Rvcih0eXBlKSB7XG4gICAgc3VwZXIoYXNzZXRzTWFuYWdlci5nZXRTcHJpdGVTaGVldCh0eXBlKSk7XG5cbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMuYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKTtcbiAgICB0aGlzLnJlZ1ggPSB0aGlzLmJvdW5kcy53aWR0aCAvIDI7XG4gICAgdGhpcy5yZWdZID0gdGhpcy5ib3VuZHMuaGVpZ2h0IC8gMjtcblxuICAgIHRoaXMuZGVhZCA9IGZhbHNlO1xuICAgIHRoaXMudlkgPSAwO1xuICB9XG4gIGZsYXAoKSB7XG4gICAgaWYgKHRoaXMuZGVhZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnZZID0gTWF0aC5tYXgodGhpcy52WSAtIENPTkZJRy5BLCAtQ09ORklHLkEpO1xuICAgIHRoaXMuZ290b0FuZFBsYXkoJ2ZsYXAnKTtcbiAgICBzb3VuZE1hbmFnZXIucGxheSgnZmxhcCcpO1xuICB9XG4gIG1vdmUoKSB7XG4gICAgdGhpcy52WSArPSBDT05GSUcuRztcbiAgICB0aGlzLnkgKz0gdGhpcy52WTtcbiAgfVxuICBkaWUoKSB7XG4gICAgaWYgKHRoaXMuZGVhZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmRlYWQgPSB0cnVlO1xuICAgIHRoaXMucm90YXRpb24gPSAzMDtcbiAgICB0aGlzLmdvdG9BbmRTdG9wKCdkZWFkJyk7XG4gICAgc291bmRNYW5hZ2VyLnBsYXkoJ2xvb3NlJyk7XG4gIH1cbn1cbiIsImltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuaW1wb3J0IEJ0biBmcm9tICcuL0J0bic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEljb25CdG4gZXh0ZW5kcyBCdG4ge1xuICBjb25zdHJ1Y3RvcihsYWJlbCwgY29sb3IgPSAnb3JhbmdlJykge1xuICAgIHN1cGVyKGxhYmVsLCBjb2xvciwgJ2ljb25CdG4nKTtcbiAgfVxuICBjcmVhdGVMYWJlbChsYWJlbCkge1xuICAgIHRoaXMubGFiZWwgPSBuZXcgY3JlYXRlanMuU3ByaXRlKGFzc2V0c01hbmFnZXIuZ2V0U3ByaXRlU2hlZXQoJ2ljb24nKSwgbGFiZWwpO1xuICAgIHRoaXMubGFiZWwucmVnWCA9IHRoaXMubGFiZWwuZ2V0Qm91bmRzKCkud2lkdGggLyAyO1xuICAgIHRoaXMubGFiZWwucmVnWSA9IHRoaXMubGFiZWwuZ2V0Qm91bmRzKCkuaGVpZ2h0IC8gMjtcbiAgICB0aGlzLmxhYmVsLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5sYWJlbCk7XG4gIH1cbiAgY2hhbmdlTGFiZWwobGFiZWwpIHtcbiAgICB0aGlzLmxhYmVsLmdvdG9BbmRTdG9wKGxhYmVsKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhZG93T3ZlcmxheSBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zaGFkb3cgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbiAgICB0aGlzLnNoYWRvdy5ncmFwaGljcy5iZWdpbkZpbGwoJ3JnYmEoMCwgMCwgMCwgMC42KScpLmRyYXdSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgdGhpcy5zaGFkb3dUZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoJycsICczMHB4IEd1ZXJpbGxhJywgJyNmZmYnKTtcbiAgICB0aGlzLnNoYWRvd1RleHQueSA9IGhlaWdodCAvIDI7XG4gICAgdGhpcy5zaGFkb3dUZXh0LnggPSB3aWR0aCAvIDI7XG4gICAgdGhpcy5zaGFkb3dUZXh0LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRoaXMuc2hhZG93VGV4dC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJztcblxuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5zaGFkb3csIHRoaXMuc2hhZG93VGV4dCk7XG4gICAgLy8gdG9kb1xuICAgIC8vIHRoaXMuY2FjaGUoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gIH1cbiAgc2V0VGV4dCh0ZXh0KSB7XG4gICAgdGhpcy5zaGFkb3dUZXh0LnRleHQgPSB0ZXh0O1xuICAgIC8vIHRoaXMudXBkYXRlQ2FjaGUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwaWtlIGV4dGVuZHMgY3JlYXRlanMuQml0bWFwIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoYXNzZXRzTWFuYWdlci5nZXRSZXN1bHQoJ3NwaWtlJykpO1xuXG4gICAgdGhpcy5ib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpO1xuICAgIHRoaXMucmVnWCA9IHRoaXMuYm91bmRzLndpZHRoIC8gMjtcbiAgICB0aGlzLnJlZ1kgPSB0aGlzLmJvdW5kcy5oZWlnaHQ7XG4gIH1cbn1cbiIsImNvbnN0IG1hbmlmZXN0ID0gW1xuICB7IGlkOiAnbW9uc3RlcicsIHNyYzogJ2ltZy9tb25zdGVyLXNwcml0ZS5wbmcnIH0sXG4gIC8vIHsgaWQ6ICdiaXJkJywgc3JjOiAnaW1nL2JpcmQtc3ByaXRlLnBuZycgfSxcbiAgLy8geyBpZDogJ2NoaWNrZW4nLCBzcmM6ICdpbWcvY2hpY2tlbi1zcHJpdGUucG5nJyB9LFxuICB7IGlkOiAnc3Bpa2UnLCBzcmM6ICdpbWcvc3Bpa2UucG5nJyB9LFxuICB7IGlkOiAnc2t5Jywgc3JjOiAnaW1nL2JnL3NreS5wbmcnIH0sXG4gIHsgaWQ6ICdzdGFydCcsIHNyYzogJ2ltZy9iZy9zdGFydC5wbmcnIH0sXG4gIHsgaWQ6ICdtb3VudGFpbicsIHNyYzogJ2ltZy9iZy9tb3VudGFpbi5wbmcnIH0sXG4gIHsgaWQ6ICdncm91bmQnLCBzcmM6ICdpbWcvYmcvZ3JvdW5kLnBuZycgfSxcbiAgeyBpZDogJ2J0bicsIHNyYzogJ2ltZy9idG4tc3ByaXRlLnBuZycgfSxcbiAgeyBpZDogJ2ljb24tYnRuJywgc3JjOiAnaW1nL2ljb24tYnRuLXNwcml0ZS5wbmcnIH0sXG4gIHsgaWQ6ICdpY29uJywgc3JjOiAnaW1nL2ljb24tc3ByaXRlLnBuZycgfSxcbiAgeyBpZDogJ2JhY2snLCBzcmM6ICdzb3VuZC9iYWNrZ3JvdW5kLm9nZycgfSxcbiAgeyBpZDogJ2ZsYXAnLCBzcmM6ICdzb3VuZC9mbGFwLm9nZycgfSxcbiAgeyBpZDogJ2xvb3NlJywgc3JjOiAnc291bmQvbG9vc2Uub2dnJyB9LFxuXTtcblxuY29uc3QgZ2V0SGVyb1Nwcml0ZVNoZWV0RGF0YSA9IG5hbWUgPT4gKHtcbiAgaW1hZ2VzOiBbbmFtZV0sXG4gIGZyYW1lczogeyB3aWR0aDogMTAwLCBoZWlnaHQ6IDc4IH0sXG4gIGFuaW1hdGlvbnM6IHtcbiAgICBmbHk6IDAsXG4gICAgZmxhcDogWzEsIDMsICdmbHknXSxcbiAgICBkZWFkOiA0LFxuICB9LFxufSk7XG5cbmNvbnN0IHNwcml0ZVNoZWV0c0RhdGEgPSB7XG4gIGJpcmQ6IGdldEhlcm9TcHJpdGVTaGVldERhdGEoJ2JpcmQnKSxcbiAgbW9uc3RlcjogZ2V0SGVyb1Nwcml0ZVNoZWV0RGF0YSgnbW9uc3RlcicpLFxuICBjaGlja2VuOiBnZXRIZXJvU3ByaXRlU2hlZXREYXRhKCdjaGlja2VuJyksXG4gIGJ0bjoge1xuICAgIGltYWdlczogWydidG4nXSxcbiAgICBmcmFtZXM6IHsgd2lkdGg6IDIxMCwgaGVpZ2h0OiA2OSwgc3BhY2luZzogMiB9LFxuICAgIGFuaW1hdGlvbnM6IHtcbiAgICAgIGdyZWVuT3V0OiAwLFxuICAgICAgZ3JlZW5PdmVyOiAyLFxuICAgICAgZ3JlZW5Eb3duOiA0LFxuICAgICAgb3JhbmdlT3V0OiA2LFxuICAgICAgb3JhbmdlT3ZlcjogOCxcbiAgICAgIG9yYW5nZURvd246IDEsXG4gICAgICByZWRPdXQ6IDMsXG4gICAgICByZWRPdmVyOiA1LFxuICAgICAgcmVkRG93bjogNyxcbiAgICAgIGRpc2FibGU6IDksXG4gICAgfSxcbiAgfSxcbiAgaWNvbkJ0bjoge1xuICAgIGltYWdlczogWydpY29uLWJ0biddLFxuICAgIGZyYW1lczogeyB3aWR0aDogNjksIGhlaWdodDogNzEsIHNwYWNpbmc6IDIgfSxcbiAgICBhbmltYXRpb25zOiB7XG4gICAgICBncmVlbk91dDogMCxcbiAgICAgIGdyZWVuT3ZlcjogMSxcbiAgICAgIGdyZWVuRG93bjogMixcbiAgICAgIG9yYW5nZU91dDogMyxcbiAgICAgIG9yYW5nZU92ZXI6IDQsXG4gICAgICBvcmFuZ2VEb3duOiA1LFxuICAgICAgcmVkT3V0OiA4LFxuICAgICAgcmVkT3ZlcjogNyxcbiAgICAgIHJlZERvd246IDYsXG4gICAgICBkaXNhYmxlOiA5LFxuICAgIH0sXG4gIH0sXG4gIGljb246IHtcbiAgICBpbWFnZXM6IFsnaWNvbiddLFxuICAgIGZyYW1lczogeyB3aWR0aDogNDAsIGhlaWdodDogNDAgfSxcbiAgICBhbmltYXRpb25zOiB7XG4gICAgICBzb3VuZDogMCxcbiAgICAgIHNvdW5kT2ZmOiAxLFxuICAgICAgcmF0aW5nOiAyLFxuICAgICAgbWVudTogMyxcbiAgICB9LFxuICB9LFxufTtcblxuY29uc3Qgc3ByaXRlU2hlZXRzID0ge307XG5cbmNvbnN0IGFzc2V0c01hbmFnZXIgPSB7XG4gIGluaXQoKSB7XG4gICAgY3JlYXRlanMuU291bmQuYWx0ZXJuYXRlRXh0ZW5zaW9ucyA9IFsnbXAzJ107XG4gICAgdGhpcy5xdWV1ZSA9IG5ldyBjcmVhdGVqcy5Mb2FkUXVldWUoKTtcbiAgICB0aGlzLnF1ZXVlLmluc3RhbGxQbHVnaW4oY3JlYXRlanMuU291bmQpO1xuICAgIHRoaXMucXVldWUubG9hZE1hbmlmZXN0KG1hbmlmZXN0KTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLnF1ZXVlLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbXBsZXRlJywgKCkgPT4gcmVzb2x2ZSgpKTtcbiAgICAgIHRoaXMucXVldWUuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKSA9PiByZWplY3QoKSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldFJlc3VsdChuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMucXVldWUuZ2V0UmVzdWx0KG5hbWUpO1xuICB9LFxuICBnZXRTcHJpdGVTaGVldChuYW1lKSB7XG4gICAgaWYgKCFzcHJpdGVTaGVldHNbbmFtZV0pIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBzcHJpdGVTaGVldHNEYXRhW25hbWVdO1xuXG4gICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHNwcml0ZVNoZWV0IG5hbWUnKTtcbiAgICAgIH1cblxuICAgICAgZGF0YS5pbWFnZXMgPSBkYXRhLmltYWdlcy5tYXAoaW1nID0+IHRoaXMuZ2V0UmVzdWx0KGltZykpO1xuICAgICAgc3ByaXRlU2hlZXRzW25hbWVdID0gbmV3IGNyZWF0ZWpzLlNwcml0ZVNoZWV0KGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiBzcHJpdGVTaGVldHNbbmFtZV07XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBhc3NldHNNYW5hZ2VyO1xuIiwiY29uc3QgZGF0YU1hbmFnZXIgPSB7XG4gIGdhbWVUeXBlOiBudWxsLFxuICBnYW1lTW9kZTogbnVsbCxcbiAgc2NvcmU6IG51bGwsXG4gIG1heFNjb3JlOiBudWxsLFxuICBoZXJvVHlwZTogJ21vbnN0ZXInLFxuICBwb3M6IG51bGwsXG4gIHdpbjogbnVsbCxcbiAgc3Bpa2VzOiBudWxsLFxuICBhY3Rpb25zOiBudWxsLFxuICB1c2VyOiB7XG4gICAgaWQ6IG51bGwsXG4gICAgbmFtZTogbnVsbCxcbiAgICBzZXg6IG51bGwsXG4gIH0sXG4gIGVuZW15OiBudWxsLFxuICBmaWVsZHM6IHtcbiAgICBub3JtYWw6IFtbMCwgOTldLCBbMTAwLCAxOTldXSxcbiAgICB1cHNpZGVEb3duOiBbWzIwMCwgMjI0XSwgWzIyNSwgMjQ5XV0sXG4gICAgYmFja3dhcmQ6IFtbMjUwLCAyNzRdLCBbMjc1LCAyOTldXSxcbiAgICBmYXN0OiBbWzMwMCwgMzI0XSwgWzMyNSwgMzQ5XV0sXG4gICAgc2xvdzogW1szNTAsIDM3NF0sIFszNzUsIDM5OV1dLFxuICAgIGVhcnRocXVha2U6IFtbNDAwLCA0MjRdLCBbNDI1LCA0NDldXSxcbiAgICBmb2c6IFtbNDUwLCA0NzRdLCBbNDc1LCA0OTldXSxcbiAgfSxcbiAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICB0aGlzW2tleV0gPSB2YWx1ZTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRhdGFNYW5hZ2VyO1xuIiwiaW1wb3J0IFN0YXJ0U2NyZWVuIGZyb20gJy4uL3NjcmVlbnMvU3RhcnRTY3JlZW4nO1xuaW1wb3J0IE1haW5TY3JlZW4gZnJvbSAnLi4vc2NyZWVucy9NYWluU2NyZWVuJztcbmltcG9ydCBQVlBTY3JlZW4gZnJvbSAnLi4vc2NyZWVucy9QVlBTY3JlZW4nO1xuaW1wb3J0IEVuZFNjcmVlbiBmcm9tICcuLi9zY3JlZW5zL0VuZFNjcmVlbic7XG5pbXBvcnQgUmF0aW5nU2NyZWVuIGZyb20gJy4uL3NjcmVlbnMvUmF0aW5nU2NyZWVuJztcblxuY29uc3Qgc2NyZWVuTWFuYWdlciA9IHtcbiAgaW5pdChzdGFnZSkge1xuICAgIHRoaXMuc3RhZ2UgPSBzdGFnZTtcbiAgICB0aGlzLmN1cnJlbnRTY3JlZW4gPSBudWxsO1xuICAgIHRoaXMuc2NyZWVucyA9IHtcbiAgICAgIFN0YXJ0U2NyZWVuLFxuICAgICAgTWFpblNjcmVlbixcbiAgICAgIFBWUFNjcmVlbixcbiAgICAgIEVuZFNjcmVlbixcbiAgICAgIFJhdGluZ1NjcmVlbixcbiAgICB9O1xuXG4gICAgY3JlYXRlanMuVGlja2VyLnRpbWluZ01vZGUgPSBjcmVhdGVqcy5UaWNrZXIuUkFGO1xuICAgIGNyZWF0ZWpzLlRpY2tlci5hZGRFdmVudExpc3RlbmVyKCd0aWNrJywgZSA9PiB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50U2NyZWVuICYmIHRoaXMuY3VycmVudFNjcmVlbi50aWNrKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFNjcmVlbi50aWNrKGUpO1xuICAgICAgfVxuICAgICAgdGhpcy5zdGFnZS51cGRhdGUoZSk7XG4gICAgfSk7XG4gIH0sXG4gIGNoYW5nZShuYW1lKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFNjcmVlbikge1xuICAgICAgaWYgKHRoaXMuY3VycmVudFNjcmVlbi5kZXN0cm95KSB7XG4gICAgICAgIHRoaXMuY3VycmVudFNjcmVlbi5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgICB0aGlzLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMuY3VycmVudFNjcmVlbik7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudFNjcmVlbiA9IG5ldyB0aGlzLnNjcmVlbnNbbmFtZV0odGhpcy5zdGFnZS5jYW52YXMud2lkdGgsIHRoaXMuc3RhZ2UuY2FudmFzLmhlaWdodCk7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmN1cnJlbnRTY3JlZW4pO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgc2NyZWVuTWFuYWdlcjtcbiIsImNvbnN0IHNlcnZlck1hbmFnZXIgPSB7XG4gIGluaXQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IFZLLmluaXQoXG4gICAgICAoKSA9PiByZXNvbHZlKCksXG4gICAgICBlID0+IHJlamVjdCgndmsgaW5pdCBlcnJvcicsIGUpLFxuICAgICc1LjYwJykpO1xuICB9LFxuICBnZXRVc2VyKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBWSy5hcGkoJ3VzZXJzLmdldCcsIHsgZmllbGRzOiAnc2V4JyB9LCByID0+IHtcbiAgICAgICAgaWYgKHIuZXJyb3IpIHtcbiAgICAgICAgICByZWplY3Qoci5lcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoci5yZXNwb25zZVswXSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0KGtleSwgZ2xvYmFsID0gMCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IFZLLmFwaSgnc3RvcmFnZS5nZXQnLCB7IGtleSwgZ2xvYmFsIH0sIHJlc29sdmUpKVxuICAgICAgLnRoZW4ociA9PiB7XG4gICAgICAgIGlmIChyLmVycm9yKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHIuZXJyb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKHIucmVzcG9uc2UgPT09ICcnKSB7XG4gICAgICAgICAgLy8gY2FudCBKU09OLnBhcnNlIGVtcHR5IHN0cmluZyBidXQgbmVlZCB0byBnZXQgZGVmYXVsdCB2YWx1ZVxuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyLnJlc3BvbnNlKTtcbiAgICAgIH0pO1xuICB9LFxuICBzZXQoa2V5LCB2YWx1ZSwgZ2xvYmFsID0gMCkge1xuICAgIFZLLmFwaSgnc3RvcmFnZS5zZXQnLCB7IGtleSwgdmFsdWU6IEpTT04uc3RyaW5naWZ5KHZhbHVlKSwgZ2xvYmFsIH0pO1xuICB9LFxuICBzaGFyZShtZXNzYWdlLCBwaG90bykge1xuICAgIGNvbnN0IHBob3RvcyA9IHtcbiAgICAgIHNpbmdsZTogJ3Bob3RvLTEzNTU2MzM4OF80NTYyMzkwMTcnLFxuICAgICAgcHZwOiAncGhvdG8tMTM1NTYzMzg4XzQ1NjIzOTAyNicsXG4gICAgfTtcbiAgICBWSy5hcGkoJ3dhbGwucG9zdCcsIHtcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBhdHRhY2htZW50czogYCR7cGhvdG9zW3Bob3RvXX0sIGh0dHBzOi8vdmsuY29tL2FwcDU3ODIxMThgLFxuICAgICAgc2VydmljZXM6ICd0d2l0dGVyJyxcbiAgICB9KTtcbiAgfSxcbiAgaW52aXRlKCkge1xuICAgIFZLLmNhbGxNZXRob2QoJ3Nob3dJbnZpdGVCb3gnKTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNlcnZlck1hbmFnZXI7XG4iLCJjb25zdCBzb3VuZE1hbmFnZXIgPSB7XG4gIGluaXQoZW5hYmxlKSB7XG4gICAgdGhpcy5lbmFibGVkID0gZW5hYmxlO1xuICAgIHRoaXMuYmcgPSBjcmVhdGVqcy5Tb3VuZC5wbGF5KCdiYWNrJywgeyBsb29wOiAtMSwgdm9sdW1lOiAwLjMgfSk7XG4gICAgdGhpcy5iZy5wYXVzZWQgPSAhdGhpcy5lbmFibGVkO1xuICAgIC8vIHNvbWV0aW1lcyBuZWdhdGl2ZSB2YWx1ZSBvY2N1cnMgYW5kIHRocm93IGVycm9yXG4gICAgdGhpcy5iZy5wb3NpdGlvbiA9IDA7XG4gIH0sXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLmVuYWJsZWQgPSAhdGhpcy5lbmFibGVkO1xuICAgIHRoaXMuYmcucGF1c2VkID0gIXRoaXMuZW5hYmxlZDtcbiAgfSxcbiAgaXNFbmFibGVkKCkge1xuICAgIHJldHVybiB0aGlzLmVuYWJsZWQ7XG4gIH0sXG4gIHBsYXkoc291bmQpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICBjcmVhdGVqcy5Tb3VuZC5wbGF5KHNvdW5kKTtcbiAgICB9XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzb3VuZE1hbmFnZXI7XG4iLCJpbXBvcnQgcmFuZG9tSW50IGZyb20gJ3JhbmRvbS1pbnQnO1xuaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5pbXBvcnQgc2NyZWVuc01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc2NyZWVuc01hbmFnZXInO1xuaW1wb3J0IHNlcnZlck1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc2VydmVyTWFuYWdlcic7XG5pbXBvcnQgZGF0YU1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvZGF0YU1hbmFnZXInO1xuaW1wb3J0IEd1aSBmcm9tICcuLi9kaXNwbGF5L0d1aSc7XG5pbXBvcnQgQnRuIGZyb20gJy4uL2Rpc3BsYXkvQnRuJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW5kU2NyZWVuIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3Iod2lkdGgpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5iZyA9IG5ldyBjcmVhdGVqcy5CaXRtYXAoYXNzZXRzTWFuYWdlci5nZXRSZXN1bHQoJ3N0YXJ0JykpO1xuICAgIHRoaXMuZ3VpID0gbmV3IEd1aSh3aWR0aCk7XG5cbiAgICB0aGlzLm1heFNjb3JlID0gbmV3IGNyZWF0ZWpzLlRleHQoYNCg0LXQutC+0YDQtDogJHtkYXRhTWFuYWdlci5tYXhTY29yZX0g0LxgLCAnMjVweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgdGhpcy5tYXhTY29yZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICB0aGlzLm1heFNjb3JlLnggPSB3aWR0aCAvIDI7XG4gICAgdGhpcy5tYXhTY29yZS55ID0gNDA7XG5cbiAgICB0aGlzLnNjb3JlID0gbmV3IGNyZWF0ZWpzLlRleHQoYNCg0LXQt9GD0LvRjNGC0LDRgjogJHtkYXRhTWFuYWdlci5zY29yZX0g0LxgLCAnNDBweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgdGhpcy5zY29yZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICB0aGlzLnNjb3JlLnggPSB3aWR0aCAvIDI7XG4gICAgdGhpcy5zY29yZS55ID0gMTUwO1xuXG4gICAgdGhpcy5yZXBsYXlCdG4gPSBuZXcgQnRuKCfQldGJ0LUg0YDQsNC3Jyk7XG4gICAgdGhpcy5yZXBsYXlCdG4ueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLnJlcGxheUJ0bi55ID0gMzUwO1xuXG4gICAgdGhpcy5zaGFyZUJ0biA9IG5ldyBCdG4oJ9Cf0L7QtNC10LvQuNGC0YzRgdGPJywgJ29yYW5nZScpO1xuICAgIHRoaXMuc2hhcmVCdG4ueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLnNoYXJlQnRuLnkgPSA0NDA7XG5cbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuYmcsIHRoaXMuZ3VpLCB0aGlzLm1heFNjb3JlLCB0aGlzLnNjb3JlLCB0aGlzLnJlcGxheUJ0biwgdGhpcy5zaGFyZUJ0bik7XG5cbiAgICBpZiAoZGF0YU1hbmFnZXIuc2NvcmUgPiBkYXRhTWFuYWdlci5tYXhTY29yZSkge1xuICAgICAgdGhpcy5tYXhTY29yZS50ZXh0ID0gYNCf0YDQvtGI0LvRi9C5INGA0LXQutC+0YDQtDogJHtkYXRhTWFuYWdlci5tYXhTY29yZX0g0LxgO1xuICAgICAgZGF0YU1hbmFnZXIubWF4U2NvcmUgPSBkYXRhTWFuYWdlci5zY29yZTtcbiAgICAgIHNlcnZlck1hbmFnZXIuc2V0KCdtYXhTY29yZScsIGRhdGFNYW5hZ2VyLm1heFNjb3JlKTtcbiAgICAgIHRoaXMuc2NvcmUudGV4dCA9IGDQndC+0LLRi9C5INGA0LXQutC+0YDQtDogJHtkYXRhTWFuYWdlci5tYXhTY29yZX0g0LwhYDtcblxuICAgICAgc2VydmVyTWFuYWdlci5nZXQoJ3JhdGluZ1RhYmxlJywgMSkudGhlbihyZWNhbGNSYXRpbmdUYWJsZSk7XG4gICAgfVxuXG4gICAgaWYgKGRhdGFNYW5hZ2VyLmdhbWVUeXBlID09PSAncHZwJykge1xuICAgICAgdGhpcy5wdnBUZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoJycsICcyNXB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICAgIHRoaXMucHZwVGV4dC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgIHRoaXMucHZwVGV4dC54ID0gd2lkdGggLyAyO1xuICAgICAgdGhpcy5wdnBUZXh0LnkgPSAyMzA7XG4gICAgICB0aGlzLmFkZENoaWxkKHRoaXMucHZwVGV4dCk7XG5cbiAgICAgIGlmIChkYXRhTWFuYWdlci53aW4pIHtcbiAgICAgICAgdGhpcy5wdnBUZXh0LnRleHQgKz0gYCR7ZGF0YU1hbmFnZXIuZW5lbXkubmFtZX0g0LHRi9C7JHtkYXRhTWFuYWdlci5lbmVteS5zZXggIT09IDIgPyAn0LAnIDogJyd9INC/0L7QstC10YDQttC10L0ke2RhdGFNYW5hZ2VyLmVuZW15LnNleCAhPT0gMiA/ICfQsCcgOiAnJ31gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wdnBUZXh0LnRleHQgKz0gYCR7ZGF0YU1hbmFnZXIuZW5lbXkubmFtZX0g0L/QvtCy0LXRgNCzJHtkYXRhTWFuYWdlci5lbmVteS5zZXggIT09IDIgPyAn0LvQsCcgOiAnJ30g0JLQsNGBYDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCByYW5nZSA9IGRhdGFNYW5hZ2VyLmZpZWxkc1tkYXRhTWFuYWdlci5nYW1lTW9kZV1bZGF0YU1hbmFnZXIucG9zXTtcbiAgICBjb25zdCBmaWVsZCA9IGBwdnAke3JhbmRvbUludChyYW5nZVswXSwgcmFuZ2VbMV0pfWA7XG4gICAgY29uc3QgcmVjb3JkID0ge1xuICAgICAgdXNlcjogZGF0YU1hbmFnZXIudXNlcixcbiAgICAgIHNwaWtlczogZGF0YU1hbmFnZXIuc3Bpa2VzLFxuICAgICAgYWN0aW9uczogZGF0YU1hbmFnZXIuYWN0aW9ucyxcbiAgICB9O1xuXG4gICAgc2VydmVyTWFuYWdlci5nZXQoZmllbGQsIDEpLnRoZW4ociA9PiB7XG4gICAgICBjb25zb2xlLndhcm4oZmllbGQpO1xuICAgICAgY29uc29sZS53YXJuKHJlY29yZCk7XG4gICAgICBjb25zb2xlLndhcm4ocik7XG5cbiAgICAgIGlmICgoIXIgfHwgci5zcGlrZXMubGVuZ3RoICogMC41IDwgcmVjb3JkLnNwaWtlcy5sZW5ndGgpICYmXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkocmVjb3JkKS5sZW5ndGggPCA0MDk2KSB7XG4gICAgICAgIGNvbnNvbGUud2Fybih0cnVlKTtcbiAgICAgICAgc2VydmVyTWFuYWdlci5zZXQoZmllbGQsIHJlY29yZCwgMSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgfVxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMucmVwbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVwbGF5KTtcbiAgICB0aGlzLnNoYXJlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hhcmUpO1xuXG4gICAgdGhpcy5vbktleURvd24gPSBlID0+IHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDMyKSB7XG4gICAgICAgIHJlcGxheSgpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duKTtcbiAgfVxuICBkZXN0cm95KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlcGxheSgpIHtcbiAgc3dpdGNoIChkYXRhTWFuYWdlci5nYW1lVHlwZSkge1xuICAgIGNhc2UgJ3NpbmdsZSc6XG4gICAgICBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ01haW5TY3JlZW4nKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3B2cCc6XG4gICAgICBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ1BWUFNjcmVlbicpO1xuICAgICAgYnJlYWs7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2hhcmUgKCkge1xuICBsZXQgbWVzc2FnZSA9ICcnO1xuICBzd2l0Y2ggKGRhdGFNYW5hZ2VyLmdhbWVUeXBlKSB7XG4gICAgY2FzZSAnc2luZ2xlJzpcbiAgICAgIG1lc3NhZ2UgPSBg0K8g0L/RgNC+0LvQtdGC0LXQuyR7ZGF0YU1hbmFnZXIudXNlci5zZXggIT09IDIgPyAn0LAnIDogJyd9ICR7ZGF0YU1hbmFnZXIuc2NvcmV9INC8INCyINC40LPRgNC1IEZsYXBweSBNb25zdGVyIWA7XG4gICAgICBpZiAoZGF0YU1hbmFnZXIuc2NvcmUgPT09IGRhdGFNYW5hZ2VyLm1heFNjb3JlKSB7XG4gICAgICAgIG1lc3NhZ2UgKz0gJ1xcbtCt0YLQviDQvNC+0Lkg0L3QvtCy0YvQuSDRgNC10LrQvtGA0LQhICc7XG4gICAgICB9XG4gICAgICBtZXNzYWdlICs9ICdcXG7QkCDRgdC60L7Qu9GM0LrQviDRgdC80L7QttC10YjRjCDRgtGLPyc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdwdnAnOlxuICAgICAgaWYgKGRhdGFNYW5hZ2VyLndpbikge1xuICAgICAgICBtZXNzYWdlICs9IGAke2RhdGFNYW5hZ2VyLmVuZW15Lm5hbWV9INCx0YvQuyR7ZGF0YU1hbmFnZXIuZW5lbXkuc2V4ICE9PSAyID8gJ9CwJyA6ICcnfSDQv9C+0LLQtdGA0LbQtdC9JHtkYXRhTWFuYWdlci5lbmVteS5zZXggIT09IDIgPyAn0LAnIDogJyd9INC80L3QvtC5INCyINC40LPRgNC1IEZsYXBweSBNb25zdGVyIWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZXNzYWdlICs9IGAke2RhdGFNYW5hZ2VyLmVuZW15Lm5hbWV9INC/0L7QstC10YDQsyR7ZGF0YU1hbmFnZXIuZW5lbXkuc2V4ICE9PSAyID8gJ9C70LAnIDogJyd9INC80LXQvdGPINCyINC40LPRgNC1IEZsYXBweSBNb25zdGVyLFxuICAgICAgICAgICAgICAgICAgINC90YMg0L3QuNGH0LXQs9C+LCDQtdGJ0LUg0YPQstC40LTQuNC80YHRjy4uLmA7XG4gICAgICB9XG4gICAgICBpZiAoZGF0YU1hbmFnZXIuc2NvcmUgPT09IGRhdGFNYW5hZ2VyLm1heFNjb3JlKSB7XG4gICAgICAgIG1lc3NhZ2UgKz0gYFxcbtCc0L7QuSDQvdC+0LLRi9C5INGA0LXQutC+0YDQtCAke2RhdGFNYW5hZ2VyLnNjb3JlfSDQvCFgO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gIH1cbiAgc2VydmVyTWFuYWdlci5zaGFyZShtZXNzYWdlLCBkYXRhTWFuYWdlci5nYW1lVHlwZSk7XG59XG5cbmZ1bmN0aW9uIHJlY2FsY1JhdGluZ1RhYmxlKHJhdGluZ1RhYmxlKSB7XG4gIGlmIChyYXRpbmdUYWJsZVtyYXRpbmdUYWJsZS5sZW5ndGggLSAxXS5zY29yZSA+PSBkYXRhTWFuYWdlci5tYXhTY29yZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHVzZXJSYXRpbmcgPSByYXRpbmdUYWJsZS5maW5kKGVsID0+IGVsLmlkID09PSBkYXRhTWFuYWdlci51c2VyLmlkKTtcblxuICBpZiAodXNlclJhdGluZykge1xuICAgIHVzZXJSYXRpbmcuc2NvcmUgPSBkYXRhTWFuYWdlci5tYXhTY29yZTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBuZXdSYXRpbmcgPSB7XG4gICAgICBpZDogZGF0YU1hbmFnZXIudXNlci5pZCxcbiAgICAgIG5hbWU6IGRhdGFNYW5hZ2VyLnVzZXIubmFtZSxcbiAgICAgIHNjb3JlOiBkYXRhTWFuYWdlci5tYXhTY29yZSxcbiAgICB9O1xuICAgIGlmIChyYXRpbmdUYWJsZS5sZW5ndGggPCAxMCkge1xuICAgICAgcmF0aW5nVGFibGUucHVzaChuZXdSYXRpbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByYXRpbmdUYWJsZVtyYXRpbmdUYWJsZS5sZW5ndGggLSAxXSA9IG5ld1JhdGluZztcbiAgICB9XG4gIH1cblxuICByYXRpbmdUYWJsZS5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7XG4gIHNlcnZlck1hbmFnZXIuc2V0KCdyYXRpbmdUYWJsZScsIHJhdGluZ1RhYmxlLCAxKTtcbn1cbiIsImltcG9ydCByYW5kb21JbnQgZnJvbSAncmFuZG9tLWludCc7XG5pbXBvcnQgc2NyZWVuc01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc2NyZWVuc01hbmFnZXInO1xuaW1wb3J0IGRhdGFNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2RhdGFNYW5hZ2VyJztcbmltcG9ydCBCYWNrZ3JvdW5kIGZyb20gJy4uL2Rpc3BsYXkvQmFja2dyb3VuZCc7XG5pbXBvcnQgSGVybyBmcm9tICcuLi9kaXNwbGF5L0hlcm8nO1xuaW1wb3J0IFNwaWtlIGZyb20gJy4uL2Rpc3BsYXkvU3Bpa2UnO1xuaW1wb3J0IFNoYWRvd092ZXJsYXkgZnJvbSAnLi4vZGlzcGxheS9TaGFkb3dPdmVybGF5JztcblxuY29uc3QgR1JPVU5EX0hFSUdIVCA9IDgwO1xuY29uc3QgU1RBUlRfU1BFRUQgPSA1O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluU2NyZWVuIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICB0aGlzLnNwZWVkID0gU1RBUlRfU1BFRUQ7XG4gICAgdGhpcy5zcGlrZVNjYWxlID0gMC43O1xuICAgIHRoaXMuc3RlcCA9IDA7XG4gICAgdGhpcy5kaXN0YW5jZSA9IDA7XG5cbiAgICBkYXRhTWFuYWdlci5nYW1lVHlwZSA9ICdzaW5nbGUnO1xuICAgIGRhdGFNYW5hZ2VyLmFjdGlvbnMgPSB7fTtcbiAgICBkYXRhTWFuYWdlci5zcGlrZXMgPSBbXTtcbiAgICBkYXRhTWFuYWdlci5wb3MgPSAwO1xuXG4gICAgdGhpcy5zaGFkb3dPdmVybGF5ID0gbmV3IFNoYWRvd092ZXJsYXkodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIHRoaXMuY3JlYXRlQmcoKTtcbiAgICB0aGlzLmNyZWF0ZVNwaWtlcygpO1xuICAgIHRoaXMuY3JlYXRlSGVybygpO1xuICAgIHRoaXMuY3JlYXRlSHVkKCk7XG5cbiAgICB0aGlzLnBhdXNlKCfQn9GA0L7QsdC10LsgLSDQstC30LzQsNGFINC60YDRi9C70YzRj9C80LgsIGVzYyAtINC/0LDRg9C30LAnKTtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIHRoaXMudGl0bGUgPSBuZXcgY3JlYXRlanMuVGV4dCgnJywgJzY1cHggR3VlcmlsbGEnLCAnI2ZmZicpO1xuICAgIHRoaXMudGl0bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgdGhpcy50aXRsZS50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJztcbiAgICB0aGlzLnRpdGxlLnggPSB3aWR0aCAvIDI7XG4gICAgdGhpcy50aXRsZS55ID0gMjI1O1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy50aXRsZSk7XG5cbiAgICAvLyBub3JtYWwgbW9kZSBmb3Igbm9vYnNcbiAgICBzd2l0Y2ggKGRhdGFNYW5hZ2VyLm1heFNjb3JlID4gNTAgPyByYW5kb21JbnQoMTApIDogMTApIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgZGF0YU1hbmFnZXIuZ2FtZU1vZGUgPSAndXBzaWRlRG93bic7XG4gICAgICAgIHRoaXMudGl0bGUudGV4dCA9ICfQktCy0LXRgNGFINC90L7Qs9Cw0LzQuCEnO1xuICAgICAgICB0aGlzLnRpdGxlLnkgPSBoZWlnaHQgLSB0aGlzLnRpdGxlLnk7XG4gICAgICAgIHRoaXMuc2hhZG93T3ZlcmxheS5zZXRUZXh0KCfQnNC40YAg0L/QtdGA0LXQstC10YDQvdGD0LvRgdGPJyk7XG4gICAgICAgIHRoaXMuaHVkRGlzdGFuY2UueSA9IGhlaWdodCAtIHRoaXMuaHVkRGlzdGFuY2UueTtcbiAgICAgICAgdGhpcy5odWREaXN0YW5jZS5jb2xvciA9ICcjZmZmJztcbiAgICAgICAgdGhpcy55ID0gdGhpcy5zaGFkb3dPdmVybGF5LnkgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuc2NhbGVZID0gdGhpcy5zaGFkb3dPdmVybGF5LnNjYWxlWSA9IHRoaXMudGl0bGUuc2NhbGVZID0gdGhpcy5odWREaXN0YW5jZS5zY2FsZVkgPSAtMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGRhdGFNYW5hZ2VyLmdhbWVNb2RlID0gJ2JhY2t3YXJkJztcbiAgICAgICAgdGhpcy50aXRsZS50ZXh0ID0gJ9Cj0YDQsNCz0LDQvSEnO1xuICAgICAgICB0aGlzLnNoYWRvd092ZXJsYXkuc2V0VGV4dCgn0J/RgtC40YbRgyDRgdC00YPQstCw0LXRgiDQvdCw0LfQsNC0Jyk7XG4gICAgICAgIHRoaXMudGl0bGUueCA9IHdpZHRoIC0gdGhpcy50aXRsZS54O1xuICAgICAgICB0aGlzLmh1ZERpc3RhbmNlLnggPSB3aWR0aCAtIHRoaXMuaHVkRGlzdGFuY2UueDtcbiAgICAgICAgdGhpcy54ID0gdGhpcy5zaGFkb3dPdmVybGF5LnggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5zY2FsZVggPSB0aGlzLmhlcm8uc2NhbGVYID0gdGhpcy5zaGFkb3dPdmVybGF5LnNjYWxlWCA9IHRoaXMudGl0bGUuc2NhbGVYID0gdGhpcy5odWREaXN0YW5jZS5zY2FsZVggPSAtMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGRhdGFNYW5hZ2VyLmdhbWVNb2RlID0gJ2Zhc3QnO1xuICAgICAgICB0aGlzLnRpdGxlLnRleHQgPSAn0J/QvtC/0YPRgtC90YvQuSDQstC10YLQtdGAISc7XG4gICAgICAgIHRoaXMuc2hhZG93T3ZlcmxheS5zZXRUZXh0KCfQodC60L7RgNC+0YHRgtGMINC/0L7Qu9C10YLQsCDQv9C+0LLRi9GI0LXQvdCwJyk7XG4gICAgICAgIHRoaXMuc3BlZWQgKz0gMjtcbiAgICAgICAgdGhpcy5zcGlrZVNjYWxlIC09IDAuMjU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBkYXRhTWFuYWdlci5nYW1lTW9kZSA9ICdzbG93JztcbiAgICAgICAgdGhpcy50aXRsZS50ZXh0ID0gJ9CS0YHRgtGA0LXRh9C90YvQuSDQstC10YLQtdGAISc7XG4gICAgICAgIHRoaXMuc2hhZG93T3ZlcmxheS5zZXRUZXh0KCfQodC60L7RgNC+0YHRgtGMINC/0L7Qu9C10YLQsCDRgdC90LjQttC10L3QsCcpO1xuICAgICAgICB0aGlzLnNwZWVkIC09IDE7XG4gICAgICAgIHRoaXMuc3Bpa2VTY2FsZSArPSAwLjA3NTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIGRhdGFNYW5hZ2VyLmdhbWVNb2RlID0gJ2VhcnRocXVha2UnO1xuICAgICAgICB0aGlzLnRpdGxlLnRleHQgPSAn0JfQtdC80LvQtdGC0YDRj9GB0LXQvdC40LUhJztcbiAgICAgICAgdGhpcy5zaGFkb3dPdmVybGF5LnNldFRleHQoJ9Ca0L7Qu9GM0Y8g0YDQsNGB0LrQsNGH0LjQstCw0Y7RgtGB0Y8nKTtcbiAgICAgICAgdGhpcy5zcGlrZXMuZm9yRWFjaCgoc3Bpa2UsIGkpID0+IHtcbiAgICAgICAgICBzcGlrZS50d2VlbiA9IGNyZWF0ZWpzLlR3ZWVuLmdldChzcGlrZSwgeyBsb29wOiB0cnVlLCBwYXVzZWQ6IHRydWUgfSlcbiAgICAgICAgICAgIC50byh7IHNrZXdYOiA5IH0sIDkwMCArIGkgKiAxMDApXG4gICAgICAgICAgICAudG8oeyBza2V3WDogLTkgfSwgMTgwMCArIGkgKiAyMDApXG4gICAgICAgICAgICAudG8oeyBza2V3WDogMCB9LCA5MDAgKyBpICogMTAwKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA1OlxuICAgICAgICBkYXRhTWFuYWdlci5nYW1lTW9kZSA9ICdmb2cnO1xuICAgICAgICB0aGlzLnRpdGxlLnRleHQgPSAn0KLRg9C80LDQvSEnO1xuICAgICAgICB0aGlzLnNoYWRvd092ZXJsYXkuc2V0VGV4dCgn0JLQuNC00LjQvNC+0YHRgtGMINGB0L3QuNC20LXQvdCwJyk7XG4gICAgICAgIHRoaXMuc3BlZWQgLT0gMS4yO1xuICAgICAgICB0aGlzLmZvZyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICAgICAgICB0aGlzLmZvZy5ncmFwaGljc1xuICAgICAgICAgIC5iZWdpblJhZGlhbEdyYWRpZW50RmlsbChcbiAgICAgICAgICAgIFsncmdiYSgyNTUsIDI1NSwgMjU1LCAwKScsICdyZ2JhKDI1NSwgMjU1LCAyNTUsIC42NSknLCAncmdiYSgyNTUsIDI1NSwgMjU1LCAuODUpJywgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgLjk3KScsICcjZmZmJ10sXG4gICAgICAgICAgICBbMCwgMC41LCAwLjcsIDAuOSwgMV0sIDAsIDAsIDAsIDAsIDAsIDM4MClcbiAgICAgICAgICAuZHJhd1JlY3QoLXRoaXMud2lkdGggLyAyLCAtdGhpcy5oZWlnaHQsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0ICogMik7XG4gICAgICAgIHRoaXMuZm9nLmNhY2hlKC10aGlzLndpZHRoIC8gMiwgLXRoaXMuaGVpZ2h0LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCAqIDIpO1xuICAgICAgICB0aGlzLmZvZy54ID0gdGhpcy5oZXJvLng7XG4gICAgICAgIHRoaXMuZm9nLnkgPSB0aGlzLmhlcm8ueTtcbiAgICAgICAgdGhpcy5mb2cuYWRkRXZlbnRMaXN0ZW5lcigndGljaycsICgpID0+IHtcbiAgICAgICAgICBpZiAoIXRoaXMuaGVyby5kZWFkKSB7XG4gICAgICAgICAgICB0aGlzLmZvZy55ID0gdGhpcy5oZXJvLnk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLmZvZywgdGhpcy5odWREaXN0YW5jZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgZGF0YU1hbmFnZXIuZ2FtZU1vZGUgPSAnbm9ybWFsJztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuc3Bpa2VzLmZvckVhY2goc3Bpa2UgPT4gdGhpcy5yZXNldFNwaWtlKHNwaWtlKSk7XG4gICAgY29uc29sZS5sb2coZGF0YU1hbmFnZXIuZ2FtZU1vZGUpO1xuICB9XG4gIGNyZWF0ZUJnKCkge1xuICAgIHRoaXMuYmdTa3kgPSBuZXcgQmFja2dyb3VuZCgnc2t5JywgdGhpcy53aWR0aCk7XG4gICAgdGhpcy5iZ01vdW50YWluID0gbmV3IEJhY2tncm91bmQoJ21vdW50YWluJywgdGhpcy53aWR0aCk7XG4gICAgdGhpcy5iZ0dyb3VuZCA9IG5ldyBCYWNrZ3JvdW5kKCdncm91bmQnLCB0aGlzLndpZHRoKTtcbiAgICB0aGlzLmJnU2t5LnkgPSB0aGlzLmJnTW91bnRhaW4ueSA9IHRoaXMuYmdHcm91bmQueSA9IHRoaXMuaGVpZ2h0O1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iZ1NreSwgdGhpcy5iZ01vdW50YWluLCB0aGlzLmJnR3JvdW5kKTtcbiAgfVxuICBjcmVhdGVTcGlrZXMoKSB7XG4gICAgdGhpcy5zcGlrZXMgPSBbbmV3IFNwaWtlKCksIG5ldyBTcGlrZSgpXTtcbiAgICB0aGlzLnNwaWtlc1swXS54ID0gLXRoaXMuc3Bpa2VzWzBdLmJvdW5kcy53aWR0aCAvIDI7XG4gICAgdGhpcy5zcGlrZXNbMV0ueCA9IHRoaXMud2lkdGggLyAyO1xuICAgIHRoaXMuYWRkQ2hpbGQoLi4udGhpcy5zcGlrZXMpO1xuICB9XG4gIGNyZWF0ZUhlcm8oKSB7XG4gICAgdGhpcy5oZXJvID0gbmV3IEhlcm8oZGF0YU1hbmFnZXIuaGVyb1R5cGUpO1xuICAgIHRoaXMuaGVyby54ID0gdGhpcy53aWR0aCAvIDI7XG4gICAgdGhpcy5oZXJvLnkgPSAxOTA7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmhlcm8pO1xuICB9XG4gIGNyZWF0ZUh1ZCgpIHtcbiAgICB0aGlzLmh1ZERpc3RhbmNlID0gbmV3IGNyZWF0ZWpzLlRleHQoJzAg0LwnLCAnMjVweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgdGhpcy5odWREaXN0YW5jZS54ID0gMjA7XG4gICAgdGhpcy5odWREaXN0YW5jZS55ID0gMTU7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmh1ZERpc3RhbmNlKTtcbiAgfVxuICByZXNldFNwaWtlKHNwaWtlKSB7XG4gICAgc3Bpa2Uuc2NhbGVZID0gKyh0aGlzLnNwaWtlU2NhbGUgKyBNYXRoLnJhbmRvbSgpICogMC40NSkudG9GaXhlZCgyKTtcbiAgICBzcGlrZS54ICs9IHRoaXMud2lkdGggKyBzcGlrZS5ib3VuZHMud2lkdGg7XG4gICAgaWYgKE1hdGgucmFuZG9tKCkgPiAwLjUpIHtcbiAgICAgIHNwaWtlLnkgPSB0aGlzLmhlaWdodCAtIEdST1VORF9IRUlHSFQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNwaWtlLnkgPSAwO1xuICAgICAgc3Bpa2Uuc2NhbGVZID0gLXNwaWtlLnNjYWxlWTtcbiAgICB9XG4gICAgZGF0YU1hbmFnZXIuc3Bpa2VzLnB1c2goc3Bpa2Uuc2NhbGVZKTtcbiAgfVxuICBwYXVzZSh0ZXh0KSB7XG4gICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgIHRoaXMuc2hhZG93T3ZlcmxheS5zZXRUZXh0KHRleHQpO1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5zaGFkb3dPdmVybGF5KTtcbiAgfVxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmhhbmRsZUFjdGlvbigpKTtcbiAgICB0aGlzLm9uS2V5RG93biA9IGUgPT4ge1xuICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICB0aGlzLmhhbmRsZUFjdGlvbigpO1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyNzpcbiAgICAgICAgICB0aGlzLnRvZ2dsZVBhdXNlKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICB9XG4gIGhhbmRsZUFjdGlvbigpIHtcbiAgICBpZiAodGhpcy5wYXVzZWQpIHtcbiAgICAgIGlmICh0aGlzLnRpdGxlKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy50aXRsZSk7XG4gICAgICAgIHRoaXMudGl0bGUgPSBudWxsO1xuICAgICAgfVxuICAgICAgdGhpcy50b2dnbGVQYXVzZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhlcm8uZmxhcCgpO1xuICAgICAgZGF0YU1hbmFnZXIuYWN0aW9uc1t0aGlzLnN0ZXBdID0gMTtcbiAgICB9XG4gIH1cbiAgdG9nZ2xlUGF1c2UoKSB7XG4gICAgaWYgKHRoaXMucGF1c2VkKSB7XG4gICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLnNoYWRvd092ZXJsYXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhdXNlKCfQndCw0LbQvNC40YLQtSDQv9GA0L7QsdC10Lsg0LjQu9C4IGVzYycpO1xuICAgIH1cbiAgICBpZiAoZGF0YU1hbmFnZXIuZ2FtZU1vZGUgPT09ICdlYXJ0aHF1YWtlJykge1xuICAgICAgdGhpcy5zcGlrZXMuZm9yRWFjaChzcGlrZSA9PiBzcGlrZS50d2Vlbi5zZXRQYXVzZWQodGhpcy5wYXVzZWQpKTtcbiAgICB9XG4gIH1cbiAgbW92ZVdvcmxkKCkge1xuICAgIGlmICh0aGlzLmhlcm8uZGVhZCkge1xuICAgICAgdGhpcy5oZXJvLnggKz0gdGhpcy5zcGVlZCAqIDAuNTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb3ZlU3Bpa2VzKHRoaXMuc3BlZWQpO1xuICAgICAgdGhpcy5iZ1NreS5tb3ZlKHRoaXMuc3BlZWQgKiAwLjEpO1xuICAgICAgdGhpcy5iZ01vdW50YWluLm1vdmUodGhpcy5zcGVlZCAqIDAuMyk7XG4gICAgICB0aGlzLmJnR3JvdW5kLm1vdmUodGhpcy5zcGVlZCk7XG5cbiAgICAgIHRoaXMuZGlzdGFuY2UgKz0gdGhpcy5zcGVlZDtcbiAgICAgIGRhdGFNYW5hZ2VyLnNjb3JlID0gTWF0aC5mbG9vcih0aGlzLmRpc3RhbmNlIC8gMjUpO1xuICAgICAgdGhpcy5odWREaXN0YW5jZS50ZXh0ID0gYCR7ZGF0YU1hbmFnZXIuc2NvcmV9INC8YDtcbiAgICB9XG4gIH1cbiAgbW92ZVNwaWtlcygpIHtcbiAgICB0aGlzLnNwaWtlcy5mb3JFYWNoKHNwaWtlID0+IHtcbiAgICAgIHNwaWtlLnggLT0gdGhpcy5zcGVlZDtcbiAgICAgIGlmIChzcGlrZS54IDwgLXNwaWtlLmJvdW5kcy53aWR0aCAvIDIpIHtcbiAgICAgICAgdGhpcy5yZXNldFNwaWtlKHNwaWtlKTtcbiAgICAgICAgdGhpcy5zcGVlZCArPSAwLjA0O1xuICAgICAgfVxuICAgICAgaWYgKG5kZ21yLmNoZWNrUGl4ZWxDb2xsaXNpb24odGhpcy5oZXJvLCBzcGlrZSkpIHtcbiAgICAgICAgdGhpcy5oZXJvLmRpZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIG1vdmVIZXJvKCkge1xuICAgIHRoaXMuaGVyby5tb3ZlKCk7XG4gICAgaWYgKHRoaXMuaGVyby55IDwgMCkge1xuICAgICAgdGhpcy5oZXJvLnZZID0gMDtcbiAgICAgIHRoaXMuaGVyby55ID0gMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaGVyby55ID4gdGhpcy5oZWlnaHQgKyB0aGlzLmhlcm8uYm91bmRzLmhlaWdodCAvIDIpIHtcbiAgICAgIHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnRW5kU2NyZWVuJyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmhlcm8ueSA+IHRoaXMuaGVpZ2h0IC0gKEdST1VORF9IRUlHSFQgKyB0aGlzLmhlcm8uYm91bmRzLmhlaWdodCAvIDIpKSB7XG4gICAgICB0aGlzLmhlcm8uZGllKCk7XG4gICAgfVxuICB9XG4gIHRpY2soKSB7XG4gICAgaWYgKHRoaXMucGF1c2VkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubW92ZVdvcmxkKCk7XG4gICAgdGhpcy5tb3ZlSGVybygpO1xuICAgIHRoaXMuc3RlcCArPSAxO1xuICB9XG4gIGRlc3Ryb3koKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gIH1cbn1cbiIsImltcG9ydCByYW5kb21JbnQgZnJvbSAncmFuZG9tLWludCc7XG5pbXBvcnQgc2NyZWVuc01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc2NyZWVuc01hbmFnZXInO1xuaW1wb3J0IHNlcnZlck1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc2VydmVyTWFuYWdlcic7XG5pbXBvcnQgZGF0YU1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvZGF0YU1hbmFnZXInO1xuaW1wb3J0IEJhY2tncm91bmQgZnJvbSAnLi4vZGlzcGxheS9CYWNrZ3JvdW5kJztcbmltcG9ydCBIZXJvIGZyb20gJy4uL2Rpc3BsYXkvSGVybyc7XG5pbXBvcnQgU3Bpa2UgZnJvbSAnLi4vZGlzcGxheS9TcGlrZSc7XG5pbXBvcnQgQnRuIGZyb20gJy4uL2Rpc3BsYXkvQnRuJztcblxuY29uc3QgR1JPVU5EX0hFSUdIVCA9IDgwO1xuY29uc3QgU1RBUlRfU1BFRUQgPSA1O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluU2NyZWVuIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICB0aGlzLnNwZWVkID0gU1RBUlRfU1BFRUQ7XG4gICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG5cbiAgICB0aGlzLmNyZWF0ZUJnKCk7XG5cbiAgICBjb25zdCB3YXRpbmdUZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoJ9CY0LTQtdGCINC/0L7QtNCx0L7RgCDRgdC+0L/QtdGA0L3QuNC60LAnLCAnMzVweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgd2F0aW5nVGV4dC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICB3YXRpbmdUZXh0LnggPSB3aWR0aCAvIDI7XG4gICAgd2F0aW5nVGV4dC55ID0gMTcwO1xuXG4gICAgY29uc3QgY2FuY2VsQnRuID0gbmV3IEJ0bign0J7RgtC80LXQvdCwJywgJ29yYW5nZScpO1xuICAgIGNhbmNlbEJ0bi54ID0gd2lkdGggLyAyO1xuICAgIGNhbmNlbEJ0bi55ID0gMzQwO1xuICAgIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnU3RhcnRTY3JlZW4nKSk7XG5cbiAgICB0aGlzLmFkZENoaWxkKHdhdGluZ1RleHQsIGNhbmNlbEJ0bik7XG5cbiAgICBjb25zdCBtb2RlcyA9IHtcbiAgICAgIDA6ICd1cHNpZGVEb3duJyxcbiAgICAgIDE6ICdiYWNrd2FyZCcsXG4gICAgICAyOiAnZmFzdCcsXG4gICAgICAzOiAnc2xvdycsXG4gICAgICA0OiAnZWFydGhxdWFrZScsXG4gICAgICA1OiAnZm9nJyxcbiAgICAgIDY6ICdub3JtYWwnLFxuICAgICAgNzogJ25vcm1hbCcsXG4gICAgICA4OiAnbm9ybWFsJyxcbiAgICAgIDk6ICdub3JtYWwnLFxuICAgICAgMTA6ICdub3JtYWwnLFxuICAgIH07XG4gICAgZGF0YU1hbmFnZXIuZ2FtZU1vZGUgPSBtb2Rlc1tkYXRhTWFuYWdlci5tYXhTY29yZSA+IDUwID8gcmFuZG9tSW50KDEwKSA6IDEwXTtcbiAgICBjb25zb2xlLmxvZyhkYXRhTWFuYWdlci5nYW1lTW9kZSk7XG4gICAgZGF0YU1hbmFnZXIucG9zID0gcmFuZG9tSW50KDEpO1xuXG4gICAgY29uc3QgZW5lbXlSYW5nZSA9IGRhdGFNYW5hZ2VyLmZpZWxkc1tkYXRhTWFuYWdlci5nYW1lTW9kZV1bMSAtIGRhdGFNYW5hZ2VyLnBvc107XG4gICAgY29uc3QgZW5lbXlGaWVsZCA9IGBwdnAke3JhbmRvbUludChlbmVteVJhbmdlWzBdLCBlbmVteVJhbmdlWzFdKX1gO1xuICAgIGNvbnNvbGUud2FybihlbmVteUZpZWxkKTtcblxuICAgIFByb21pc2UuYWxsKFtcbiAgICAgIHNlcnZlck1hbmFnZXIuZ2V0KGVuZW15RmllbGQsIDEpLnRoZW4ociA9PiB0aGlzLmluaXREYXRhKHIpKSxcbiAgICAgIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBNYXRoLnJhbmRvbSgpICogMjAwMCArIDUwMCkpLFxuICAgIF0pLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgICB0aGlzLnJlbW92ZUNoaWxkKHdhdGluZ1RleHQsIGNhbmNlbEJ0bik7XG4gICAgfSkuY2F0Y2goZSA9PiB7XG4gICAgICB3YXRpbmdUZXh0LnRleHQgPSAnUFZQINCy0YDQtdC80LXQvdC90L4g0L3QtdC00L7RgdGC0YPQv9C90L4gOignO1xuICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICB9KTtcblxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICB9XG4gIGluaXREYXRhKHJlY29yZCkge1xuICAgIGRhdGFNYW5hZ2VyLmdhbWVUeXBlID0gJ3B2cCc7XG4gICAgZGF0YU1hbmFnZXIud2luID0gZmFsc2U7XG4gICAgZGF0YU1hbmFnZXIuYWN0aW9ucyA9IHt9O1xuICAgIGRhdGFNYW5hZ2VyLnNwaWtlcyA9IFtdO1xuICAgIGRhdGFNYW5hZ2VyLmVuZW15ID0gcmVjb3JkLnVzZXI7XG4gICAgdGhpcy5lbmVteVNwaWtlcyA9IHJlY29yZC5zcGlrZXM7XG4gICAgdGhpcy5lbmVteUFjdGlvbnMgPSByZWNvcmQuYWN0aW9ucztcbiAgICBpZiAoZGF0YU1hbmFnZXIudXNlci5pZCA9PT0gcmVjb3JkLnVzZXIuaWQpIHtcbiAgICAgIGRhdGFNYW5hZ2VyLmVuZW15Lm5hbWUgPSAn0J/RgNC40LfRgNCw0YfQvdGL0Lkg0L/RgtC40YYnO1xuICAgIH1cbiAgfVxuICBpbml0KCkge1xuICAgIHRoaXMuc3Bpa2VJbmRleCA9IDA7XG4gICAgdGhpcy5zdGVwID0gMDtcbiAgICB0aGlzLmRpc3RhbmNlID0gMDtcblxuICAgIHRoaXMuY3JlYXRlU3Bpa2VzKCk7XG4gICAgdGhpcy5jcmVhdGVIdWQoKTtcblxuICAgIGNvbnN0IGNvdW50ZXIgPSBuZXcgY3JlYXRlanMuVGV4dCgzLCAnMTI1cHggR3VlcmlsbGEnLCAnIzAwMCcpO1xuICAgIGNvdW50ZXIudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgY291bnRlci54ID0gdGhpcy53aWR0aCAvIDI7XG4gICAgY291bnRlci55ID0gMzEwO1xuXG4gICAgdGhpcy5hZGRDaGlsZChjb3VudGVyKTtcblxuICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgY291bnRlci50ZXh0IC09IDE7XG4gICAgICBpZiAoY291bnRlci50ZXh0IDwgMCkge1xuICAgICAgICB0aGlzLnJlbW92ZUNoaWxkKGNvdW50ZXIpO1xuICAgICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICBpZiAoZGF0YU1hbmFnZXIuZ2FtZU1vZGUgPT09ICdlYXJ0aHF1YWtlJykge1xuICAgICAgICAgIHRoaXMuc3Bpa2VzLmZvckVhY2goc3Bpa2UgPT4gc3Bpa2UudHdlZW4uc2V0UGF1c2VkKGZhbHNlKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLnRpdGxlLCB0aGlzLnNoYWRvd1RleHQpO1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgIH1cbiAgICB9LCAxMDAwKTtcblxuICAgIHRoaXMuaGVybyA9IHRoaXMuY3JlYXRlSGVybyhkYXRhTWFuYWdlci5wb3MsIGRhdGFNYW5hZ2VyLnVzZXIubmFtZSk7XG4gICAgdGhpcy5lbmVteSA9IHRoaXMuY3JlYXRlSGVybygxIC0gZGF0YU1hbmFnZXIucG9zLCBkYXRhTWFuYWdlci5lbmVteS5uYW1lKTtcbiAgICB0aGlzLmVuZW15LmFscGhhID0gMC41O1xuXG4gICAgdGhpcy50aXRsZSA9IG5ldyBjcmVhdGVqcy5UZXh0KCcnLCAnNjVweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgdGhpcy50aXRsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICB0aGlzLnRpdGxlLnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuICAgIHRoaXMudGl0bGUueCA9IHRoaXMud2lkdGggLyAyO1xuICAgIHRoaXMudGl0bGUueSA9IDIyNTtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMudGl0bGUpO1xuXG4gICAgdGhpcy5zaGFkb3dUZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoJycsICczMHB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICB0aGlzLnNoYWRvd1RleHQueSA9IHRoaXMuaGVpZ2h0IC8gMjtcbiAgICB0aGlzLnNoYWRvd1RleHQueCA9IHRoaXMud2lkdGggLyAyO1xuICAgIHRoaXMuc2hhZG93VGV4dC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICB0aGlzLnNoYWRvd1RleHQudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLnNoYWRvd1RleHQpO1xuXG4gICAgdGhpcy50aXRsZS55ICs9IDU1O1xuICAgIHRoaXMuc2hhZG93VGV4dC55ICs9IDQwO1xuICAgIGNvdW50ZXIueSArPSA1MDtcblxuICAgIHN3aXRjaCAoZGF0YU1hbmFnZXIuZ2FtZU1vZGUpIHtcbiAgICAgIGNhc2UgJ3Vwc2lkZURvd24nOlxuICAgICAgICB0aGlzLnRpdGxlLnRleHQgPSAn0JLQstC10YDRhSDQvdC+0LPQsNC80LghJztcbiAgICAgICAgdGhpcy5zaGFkb3dUZXh0LnRleHQgPSAn0JzQuNGAINC/0LXRgNC10LLQtdGA0L3Rg9C70YHRjyc7XG4gICAgICAgIHRoaXMuaHVkRGlzdGFuY2UueSA9IHRoaXMuaGVpZ2h0IC0gdGhpcy5odWREaXN0YW5jZS55O1xuICAgICAgICB0aGlzLmh1ZERpc3RhbmNlLmNvbG9yID0gJyNmZmYnO1xuICAgICAgICB0aGlzLnkgPSB0aGlzLmhlaWdodDtcbiAgICAgICAgY291bnRlci55ID0gNTUwO1xuICAgICAgICB0aGlzLnRpdGxlLnkgKz0gODU7XG4gICAgICAgIHRoaXMuc2hhZG93VGV4dC55IC09IDQ1O1xuICAgICAgICB0aGlzLnNjYWxlWSA9IGNvdW50ZXIuc2NhbGVZID0gdGhpcy5zaGFkb3dUZXh0LnNjYWxlWSA9IHRoaXMudGl0bGUuc2NhbGVZID0gdGhpcy5odWREaXN0YW5jZS5zY2FsZVkgPSAtMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdiYWNrd2FyZCc6XG4gICAgICAgIHRoaXMudGl0bGUudGV4dCA9ICfQo9GA0LDQs9Cw0L0hJztcbiAgICAgICAgdGhpcy5zaGFkb3dUZXh0LnRleHQgPSAn0J/RgtC40YbRgyDRgdC00YPQstCw0LXRgiDQvdCw0LfQsNC0JztcbiAgICAgICAgdGhpcy50aXRsZS54ID0gdGhpcy53aWR0aCAtIHRoaXMudGl0bGUueDtcbiAgICAgICAgdGhpcy5odWREaXN0YW5jZS54ID0gdGhpcy53aWR0aCAtIHRoaXMuaHVkRGlzdGFuY2UueDtcbiAgICAgICAgdGhpcy54ID0gdGhpcy53aWR0aDtcbiAgICAgICAgdGhpcy5zY2FsZVggPSBjb3VudGVyLnNjYWxlWCA9IHRoaXMuaGVyby5zY2FsZVggPSB0aGlzLmVuZW15LnNjYWxlWCA9IHRoaXMuc2hhZG93VGV4dC5zY2FsZVggPSB0aGlzLnRpdGxlLnNjYWxlWCA9IHRoaXMuaHVkRGlzdGFuY2Uuc2NhbGVYID0gLTE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZmFzdCc6XG4gICAgICAgIHRoaXMudGl0bGUudGV4dCA9ICfQn9C+0L/Rg9GC0L3Ri9C5INCy0LXRgtC10YAhJztcbiAgICAgICAgdGhpcy5zaGFkb3dUZXh0LnRleHQgPSAn0KHQutC+0YDQvtGB0YLRjCDQv9C+0LvQtdGC0LAg0L/QvtCy0YvRiNC10L3QsCc7XG4gICAgICAgIHRoaXMuc3BlZWQgKz0gMjtcbiAgICAgICAgdGhpcy5zcGlrZVNjYWxlIC09IDAuMjU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc2xvdyc6XG4gICAgICAgIHRoaXMudGl0bGUudGV4dCA9ICfQktGB0YLRgNC10YfQvdGL0Lkg0LLQtdGC0LXRgCEnO1xuICAgICAgICB0aGlzLnNoYWRvd1RleHQudGV4dCA9ICfQodC60L7RgNC+0YHRgtGMINC/0L7Qu9C10YLQsCDRgdC90LjQttC10L3QsCc7XG4gICAgICAgIHRoaXMuc3BlZWQgLT0gMTtcbiAgICAgICAgdGhpcy5zcGlrZVNjYWxlICs9IDAuMDc1O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2VhcnRocXVha2UnOlxuICAgICAgICB0aGlzLnRpdGxlLnRleHQgPSAn0JfQtdC80LvQtdGC0YDRj9GB0LXQvdC40LUhJztcbiAgICAgICAgdGhpcy5zaGFkb3dUZXh0LnRleHQgPSAn0JrQvtC70YzRjyDRgNCw0YHQutCw0YfQuNCy0LDRjtGC0YHRjyc7XG4gICAgICAgIHRoaXMuc3Bpa2VzLmZvckVhY2goKHNwaWtlLCBpKSA9PiB7XG4gICAgICAgICAgc3Bpa2UudHdlZW4gPSBjcmVhdGVqcy5Ud2Vlbi5nZXQoc3Bpa2UsIHsgbG9vcDogdHJ1ZSwgcGF1c2VkOiB0cnVlIH0pXG4gICAgICAgICAgICAudG8oeyBza2V3WDogOSB9LCA5MDAgKyBpICogMTAwKVxuICAgICAgICAgICAgLnRvKHsgc2tld1g6IC05IH0sIDE4MDAgKyBpICogMjAwKVxuICAgICAgICAgICAgLnRvKHsgc2tld1g6IDAgfSwgOTAwICsgaSAqIDEwMCk7XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2ZvZyc6XG4gICAgICAgIHRoaXMudGl0bGUudGV4dCA9ICfQotGD0LzQsNC9ISc7XG4gICAgICAgIHRoaXMuc2hhZG93VGV4dC50ZXh0ID0gJ9CS0LjQtNC40LzQvtGB0YLRjCDRgdC90LjQttC10L3QsCc7XG4gICAgICAgIHRoaXMuc3BlZWQgLT0gMS4yO1xuICAgICAgICB0aGlzLmZvZyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICAgICAgICB0aGlzLmZvZy5ncmFwaGljc1xuICAgICAgICAgIC5iZWdpblJhZGlhbEdyYWRpZW50RmlsbChcbiAgICAgICAgICAgIFsncmdiYSgyNTUsIDI1NSwgMjU1LCAwKScsICdyZ2JhKDI1NSwgMjU1LCAyNTUsIC42NSknLCAncmdiYSgyNTUsIDI1NSwgMjU1LCAuODUpJywgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgLjk3KScsICcjZmZmJ10sXG4gICAgICAgICAgICBbMCwgMC41LCAwLjcsIDAuOSwgMV0sIDAsIDAsIDAsIDAsIDAsIDM4MClcbiAgICAgICAgICAuZHJhd1JlY3QoLXRoaXMud2lkdGggLyAyLCAtdGhpcy5oZWlnaHQsIHRoaXMud2lkdGggKiAxLjUsIHRoaXMuaGVpZ2h0ICogMik7XG4gICAgICAgIHRoaXMuZm9nLmNhY2hlKC10aGlzLndpZHRoIC8gMiwgLXRoaXMuaGVpZ2h0LCB0aGlzLndpZHRoICogMS41LCB0aGlzLmhlaWdodCAqIDIpO1xuICAgICAgICB0aGlzLmZvZy54ID0gdGhpcy5oZXJvLng7XG4gICAgICAgIHRoaXMuZm9nLnkgPSB0aGlzLmhlcm8ueTtcbiAgICAgICAgdGhpcy5mb2cuYWRkRXZlbnRMaXN0ZW5lcigndGljaycsICgpID0+IHtcbiAgICAgICAgICBpZiAoIXRoaXMuaGVyby5kZWFkKSB7XG4gICAgICAgICAgICB0aGlzLmZvZy55ID0gdGhpcy5oZXJvLnk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLmZvZywgdGhpcy5odWREaXN0YW5jZSwgY291bnRlcik7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLnNwaWtlcy5mb3JFYWNoKHNwaWtlID0+IHRoaXMucmVzZXRTcGlrZShzcGlrZSkpO1xuICB9XG4gIGNyZWF0ZUJnKCkge1xuICAgIHRoaXMuYmdTa3kgPSBuZXcgQmFja2dyb3VuZCgnc2t5JywgdGhpcy53aWR0aCk7XG4gICAgdGhpcy5iZ01vdW50YWluID0gbmV3IEJhY2tncm91bmQoJ21vdW50YWluJywgdGhpcy53aWR0aCk7XG4gICAgdGhpcy5iZ0dyb3VuZCA9IG5ldyBCYWNrZ3JvdW5kKCdncm91bmQnLCB0aGlzLndpZHRoKTtcbiAgICB0aGlzLmJnU2t5LnkgPSB0aGlzLmJnTW91bnRhaW4ueSA9IHRoaXMuYmdHcm91bmQueSA9IHRoaXMuaGVpZ2h0O1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iZ1NreSwgdGhpcy5iZ01vdW50YWluLCB0aGlzLmJnR3JvdW5kKTtcbiAgfVxuICBjcmVhdGVTcGlrZXMoKSB7XG4gICAgdGhpcy5zcGlrZXMgPSBbbmV3IFNwaWtlKCksIG5ldyBTcGlrZSgpXTtcbiAgICB0aGlzLnNwaWtlc1swXS54ID0gLXRoaXMuc3Bpa2VzWzBdLmJvdW5kcy53aWR0aCAvIDI7XG4gICAgdGhpcy5zcGlrZXNbMV0ueCA9IHRoaXMud2lkdGggLyAyO1xuICAgIHRoaXMuYWRkQ2hpbGQoLi4udGhpcy5zcGlrZXMpO1xuICB9XG4gIGNyZWF0ZUhlcm8ocG9zLCBuYW1lKSB7XG4gICAgY29uc3QgaGVybyA9IG5ldyBIZXJvKGRhdGFNYW5hZ2VyLmhlcm9UeXBlKTtcbiAgICBoZXJvLnggPSB0aGlzLndpZHRoIC8gMiAtIDE4MCAqIHBvcztcbiAgICBoZXJvLnkgPSAxOTAgLSA1MCAqIHBvcztcblxuICAgIGNvbnN0IGhlcm9OYW1lID0gbmV3IGNyZWF0ZWpzLlRleHQobmFtZSwgJzI1cHggR3VlcmlsbGEnLCAnIzAwMCcpO1xuICAgIGhlcm9OYW1lLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIGhlcm9OYW1lLnkgPSBoZXJvLnkgLSAxMDA7XG4gICAgaGVyb05hbWUueCA9IGhlcm8ueDtcbiAgICBpZiAoZGF0YU1hbmFnZXIuZ2FtZU1vZGUgPT09ICd1cHNpZGVEb3duJykge1xuICAgICAgaGVyb05hbWUuc2NhbGVZID0gLTE7XG4gICAgICBoZXJvTmFtZS55ICs9IDMwO1xuICAgIH1cbiAgICBpZiAoZGF0YU1hbmFnZXIuZ2FtZU1vZGUgPT09ICdiYWNrd2FyZCcpIHtcbiAgICAgIGhlcm9OYW1lLnNjYWxlWCA9IC0xO1xuICAgIH1cbiAgICB0aGlzLmFkZENoaWxkKGhlcm8sIGhlcm9OYW1lKTtcblxuICAgIGNyZWF0ZWpzLlR3ZWVuLmdldChoZXJvTmFtZSkud2FpdCgyNDAwKS50byh7IGFscGhhOiAwIH0sIDgwMClcbiAgICAgIC5jYWxsKCgpID0+IHRoaXMucmVtb3ZlQ2hpbGQoaGVyb05hbWUpKTtcblxuICAgIHJldHVybiBoZXJvO1xuICB9XG4gIGNyZWF0ZUh1ZCgpIHtcbiAgICB0aGlzLmh1ZERpc3RhbmNlID0gbmV3IGNyZWF0ZWpzLlRleHQoJzAg0LwnLCAnMjVweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgdGhpcy5odWREaXN0YW5jZS54ID0gMjA7XG4gICAgdGhpcy5odWREaXN0YW5jZS55ID0gMTU7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmh1ZERpc3RhbmNlKTtcbiAgfVxuICByZXNldFNwaWtlKHNwaWtlKSB7XG4gICAgc3Bpa2UueCArPSB0aGlzLndpZHRoICsgc3Bpa2UuYm91bmRzLndpZHRoO1xuXG4gICAgaWYgKHRoaXMuZW5lbXlTcGlrZXNbdGhpcy5zcGlrZUluZGV4XSkge1xuICAgICAgc3Bpa2Uuc2NhbGVZID0gdGhpcy5lbmVteVNwaWtlc1t0aGlzLnNwaWtlSW5kZXhdO1xuICAgICAgdGhpcy5zcGlrZUluZGV4ICs9IDE7XG5cbiAgICAgIGlmIChzcGlrZS5zY2FsZVkgPiAwKSB7XG4gICAgICAgIHNwaWtlLnkgPSB0aGlzLmhlaWdodCAtIEdST1VORF9IRUlHSFQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzcGlrZS55ID0gMDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3Bpa2Uuc2NhbGVZID0gKygwLjcgKyBNYXRoLnJhbmRvbSgpICogMC40NSkudG9GaXhlZCgyKTtcbiAgICAgIGlmIChNYXRoLnJhbmRvbSgpID4gMC41KSB7XG4gICAgICAgIHNwaWtlLnkgPSB0aGlzLmhlaWdodCAtIEdST1VORF9IRUlHSFQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzcGlrZS55ID0gMDtcbiAgICAgICAgc3Bpa2Uuc2NhbGVZID0gLXNwaWtlLnNjYWxlWTtcbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YU1hbmFnZXIuc3Bpa2VzLnB1c2goc3Bpa2Uuc2NhbGVZKTtcbiAgfVxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmhhbmRsZUFjdGlvbigpKTtcbiAgICB0aGlzLm9uS2V5RG93biA9IGUgPT4ge1xuICAgICAgdGhpcy5oYW5kbGVBY3Rpb24oKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gIH1cbiAgaGFuZGxlQWN0aW9uKCkge1xuICAgIGlmICghdGhpcy5zdGFydGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuaGVyby5mbGFwKCk7XG4gICAgZGF0YU1hbmFnZXIuYWN0aW9uc1t0aGlzLnN0ZXBdID0gMTtcbiAgfVxuICBtb3ZlV29ybGQoKSB7XG4gICAgdGhpcy5tb3ZlU3Bpa2VzKHRoaXMuc3BlZWQpO1xuICAgIHRoaXMuYmdTa3kubW92ZSh0aGlzLnNwZWVkICogMC4xKTtcbiAgICB0aGlzLmJnTW91bnRhaW4ubW92ZSh0aGlzLnNwZWVkICogMC4zKTtcbiAgICB0aGlzLmJnR3JvdW5kLm1vdmUodGhpcy5zcGVlZCk7XG5cbiAgICB0aGlzLmRpc3RhbmNlICs9IHRoaXMuc3BlZWQ7XG4gICAgZGF0YU1hbmFnZXIuc2NvcmUgPSBNYXRoLmZsb29yKHRoaXMuZGlzdGFuY2UgLyAyNSk7XG4gICAgdGhpcy5odWREaXN0YW5jZS50ZXh0ID0gYCR7ZGF0YU1hbmFnZXIuc2NvcmV9INC8YDtcbiAgfVxuICBtb3ZlU3Bpa2VzKCkge1xuICAgIHRoaXMuc3Bpa2VzLmZvckVhY2goc3Bpa2UgPT4ge1xuICAgICAgc3Bpa2UueCAtPSB0aGlzLnNwZWVkO1xuICAgICAgaWYgKHNwaWtlLnggPCAtc3Bpa2UuYm91bmRzLndpZHRoIC8gMikge1xuICAgICAgICB0aGlzLnJlc2V0U3Bpa2Uoc3Bpa2UpO1xuICAgICAgICB0aGlzLnNwZWVkICs9IDAuMDQ7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgbW92ZUhlcm8oaGVybykge1xuICAgIGhlcm8ubW92ZSgpO1xuICAgIGlmIChoZXJvLnkgPCAwKSB7XG4gICAgICBoZXJvLnZZID0gMDtcbiAgICAgIGhlcm8ueSA9IDA7XG4gICAgfSBlbHNlIGlmIChoZXJvLnkgPiB0aGlzLmhlaWdodCArIGhlcm8uYm91bmRzLmhlaWdodCAvIDIpIHtcbiAgICAgIGlmIChoZXJvID09PSB0aGlzLmhlcm8pIHtcbiAgICAgICAgc2NyZWVuc01hbmFnZXIuY2hhbmdlKCdFbmRTY3JlZW4nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGFNYW5hZ2VyLndpbiA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChoZXJvLnkgPiB0aGlzLmhlaWdodCAtIChHUk9VTkRfSEVJR0hUICsgaGVyby5ib3VuZHMuaGVpZ2h0IC8gMikpIHtcbiAgICAgIGhlcm8uZGllKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNwaWtlcy5zb21lKHNwaWtlID0+IG5kZ21yLmNoZWNrUGl4ZWxDb2xsaXNpb24oaGVybywgc3Bpa2UpKSkge1xuICAgICAgaGVyby5kaWUoKTtcbiAgICB9XG4gIH1cbiAgdGljaygpIHtcbiAgICBpZiAoIXRoaXMuc3RhcnRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm1vdmVXb3JsZCgpO1xuICAgIHRoaXMubW92ZUhlcm8odGhpcy5oZXJvKTtcbiAgICB0aGlzLm1vdmVIZXJvKHRoaXMuZW5lbXkpO1xuXG4gICAgdGhpcy5zdGVwICs9IDE7XG4gICAgaWYgKHRoaXMuZW5lbXlBY3Rpb25zW3RoaXMuc3RlcF0pIHtcbiAgICAgIHRoaXMuZW5lbXkuZmxhcCgpO1xuICAgIH1cbiAgfVxuICBkZXN0cm95KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICB9XG59XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcbmltcG9ydCBkYXRhTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9kYXRhTWFuYWdlcic7XG5pbXBvcnQgc2VydmVyTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zZXJ2ZXJNYW5hZ2VyJztcbmltcG9ydCBHdWkgZnJvbSAnLi4vZGlzcGxheS9HdWknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYXRpbmdTY3JlZW4gZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3Rvcih3aWR0aCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG5cbiAgICB0aGlzLmJnID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChhc3NldHNNYW5hZ2VyLmdldFJlc3VsdCgnc3RhcnQnKSk7XG4gICAgdGhpcy5ndWkgPSBuZXcgR3VpKHdpZHRoKTtcblxuICAgIHRoaXMudGl0bGUgPSBuZXcgY3JlYXRlanMuVGV4dCgn0KDQtdC50YLQuNC90LMnLCAnMzVweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgdGhpcy50aXRsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICB0aGlzLnRpdGxlLnggPSB0aGlzLndpZHRoIC8gMjtcbiAgICB0aGlzLnRpdGxlLnkgPSAzNTtcblxuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iZywgdGhpcy5ndWksIHRoaXMudGl0bGUpO1xuXG4gICAgc2VydmVyTWFuYWdlci5nZXQoJ3JhdGluZ1RhYmxlJywgMSlcbiAgICAgIC8vIHRvZG86IHJlbW92ZSBsYXRlciwgbm93IGl0IGFkZCByZWNvcmRzIGZvciBvbGQgdXNlcnNcbiAgICAgIC50aGVuKHJlY2FsY1JhdGluZ1RhYmxlKVxuICAgICAgLnRoZW4ociA9PiB0aGlzLnNob3dSYXRpbmcocikpXG4gICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICBjb25zdCB0ZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoJ9Cg0LXQudGC0LjQvdCzINCy0YDQtdC80LXQvdC90L4g0L3QtdC00L7RgdGC0YPQv9C10L0gOignLCAnMjVweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgICAgIHRleHQudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgIHRleHQueCA9IHRoaXMud2lkdGggLyAyO1xuICAgICAgICB0ZXh0LnkgPSAxNTA7XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGV4dCk7XG4gICAgICB9KTtcbiAgfVxuICBzaG93UmF0aW5nKHJhdGluZ1RhYmxlKSB7XG4gICAgbGV0IHdpbm5lciA9IGZhbHNlO1xuXG4gICAgcmF0aW5nVGFibGUuZm9yRWFjaCgoZWwsIGkpID0+IHtcbiAgICAgIGNvbnN0IHRleHQgPSBuZXcgY3JlYXRlanMuVGV4dChgJHtpICsgMX0gJHtlbC5uYW1lfSAke2VsLnNjb3JlfSDQvGAsICcyNXB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICAgIHRleHQueSA9IDEyMCArIGkgKiA0MDtcbiAgICAgIHRleHQueCA9IDEyMDtcbiAgICAgIHRoaXMuYWRkQ2hpbGQodGV4dCk7XG5cbiAgICAgIGlmIChlbC5pZCA9PT0gZGF0YU1hbmFnZXIudXNlci5pZCkge1xuICAgICAgICB3aW5uZXIgPSB0cnVlO1xuICAgICAgICB0ZXh0LmNvbG9yID0gJyM3RUNFMkUnO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKCF3aW5uZXIpIHtcbiAgICAgIGNvbnN0IHRleHQgPSBuZXcgY3JlYXRlanMuVGV4dChgLSAke2RhdGFNYW5hZ2VyLnVzZXIubmFtZX0gJHtkYXRhTWFuYWdlci5tYXhTY29yZX0g0LxgLCAnMjVweCBHdWVyaWxsYScsICcjN0VDRTJFJyk7XG4gICAgICB0ZXh0LnkgPSAxMjAgKyByYXRpbmdUYWJsZS5sZW5ndGggKiA0MDtcbiAgICAgIHRleHQueCA9IDEyMDtcbiAgICAgIHRoaXMuYWRkQ2hpbGQodGV4dCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlY2FsY1JhdGluZ1RhYmxlKHJhdGluZ1RhYmxlKSB7XG4gIGlmIChyYXRpbmdUYWJsZVtyYXRpbmdUYWJsZS5sZW5ndGggLSAxXS5zY29yZSA8IGRhdGFNYW5hZ2VyLm1heFNjb3JlKSB7XG4gICAgY29uc3QgdXNlclJhdGluZyA9IHJhdGluZ1RhYmxlLmZpbmQoZWwgPT4gZWwuaWQgPT09IGRhdGFNYW5hZ2VyLnVzZXIuaWQpO1xuXG4gICAgaWYgKHVzZXJSYXRpbmcpIHtcbiAgICAgIHVzZXJSYXRpbmcuc2NvcmUgPSBkYXRhTWFuYWdlci5tYXhTY29yZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmV3UmF0aW5nID0ge1xuICAgICAgICBpZDogZGF0YU1hbmFnZXIudXNlci5pZCxcbiAgICAgICAgbmFtZTogZGF0YU1hbmFnZXIudXNlci5uYW1lLFxuICAgICAgICBzY29yZTogZGF0YU1hbmFnZXIubWF4U2NvcmUsXG4gICAgICB9O1xuICAgICAgaWYgKHJhdGluZ1RhYmxlLmxlbmd0aCA8IDEwKSB7XG4gICAgICAgIHJhdGluZ1RhYmxlLnB1c2gobmV3UmF0aW5nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJhdGluZ1RhYmxlW3JhdGluZ1RhYmxlLmxlbmd0aCAtIDFdID0gbmV3UmF0aW5nO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJhdGluZ1RhYmxlLnNvcnQoKGEsIGIpID0+IGIuc2NvcmUgLSBhLnNjb3JlKTtcbiAgICBzZXJ2ZXJNYW5hZ2VyLnNldCgncmF0aW5nVGFibGUnLCByYXRpbmdUYWJsZSwgMSk7XG4gIH1cbiAgcmV0dXJuIHJhdGluZ1RhYmxlO1xufVxuIiwiaW1wb3J0IHNlcnZlck1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc2VydmVyTWFuYWdlcic7XG5pbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcbmltcG9ydCBzY3JlZW5zTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlcic7XG5pbXBvcnQgZGF0YU1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvZGF0YU1hbmFnZXInO1xuaW1wb3J0IEd1aSBmcm9tICcuLi9kaXNwbGF5L0d1aSc7XG5pbXBvcnQgSGVybyBmcm9tICcuLi9kaXNwbGF5L0hlcm8nO1xuaW1wb3J0IEJ0biBmcm9tICcuLi9kaXNwbGF5L0J0bic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXJ0U2NyZWVuIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICB0aGlzLmJnID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChhc3NldHNNYW5hZ2VyLmdldFJlc3VsdCgnc3RhcnQnKSk7XG4gICAgdGhpcy5ndWkgPSBuZXcgR3VpKHdpZHRoKTtcblxuICAgIHRoaXMuc3RhcnRCdG4gPSBuZXcgQnRuKCfQmNCz0YDQsNGC0YwnKTtcbiAgICB0aGlzLnN0YXJ0QnRuLnggPSB3aWR0aCAvIDI7XG4gICAgdGhpcy5zdGFydEJ0bi55ID0gMzIwO1xuXG4gICAgdGhpcy5wdnBCdG4gPSBuZXcgQnRuKCdQVlAnKTtcbiAgICB0aGlzLnB2cEJ0bi54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMucHZwQnRuLnkgPSA0MTA7XG5cbiAgICB0aGlzLmludml0ZUJ0biA9IG5ldyBCdG4oJ9Cf0L7Qt9Cy0LDRgtGMINCx0YDQvicsICdvcmFuZ2UnKTtcbiAgICB0aGlzLmludml0ZUJ0bi54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMuaW52aXRlQnRuLnkgPSA1MDA7XG5cbiAgICB0aGlzLmhlcm8gPSBuZXcgSGVybygnbW9uc3RlcicpO1xuICAgIHRoaXMuaGVyby54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMuaGVyby55ID0gMTkwO1xuXG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmJnLCB0aGlzLmd1aSwgdGhpcy5oZXJvLCB0aGlzLnN0YXJ0QnRuLCB0aGlzLnB2cEJ0biwgdGhpcy5pbnZpdGVCdG4pO1xuXG4gICAgaWYgKGRhdGFNYW5hZ2VyLm1heFNjb3JlKSB7XG4gICAgICB0aGlzLnNjb3JlID0gbmV3IGNyZWF0ZWpzLlRleHQoYNCg0LXQutC+0YDQtDogJHtkYXRhTWFuYWdlci5tYXhTY29yZX0g0LxgLCAnMjVweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgICB0aGlzLnNjb3JlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgdGhpcy5zY29yZS54ID0gdGhpcy53aWR0aCAvIDI7XG4gICAgICB0aGlzLnNjb3JlLnkgPSA0MDtcbiAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5zY29yZSk7XG4gICAgfVxuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gIH1cbiAgLy8gY3JlYXRlSGVyb2VzKCkge1xuICAvLyAgIHRoaXMuaGVyb2VzID0gW1xuICAvLyAgICAgbmV3IEhlcm8oJ2JpcmQnKSxcbiAgLy8gICAgIG5ldyBIZXJvKCdtb25zdGVyJyksXG4gIC8vICAgICBuZXcgSGVybygnY2hpY2tlbicpLFxuICAvLyAgIF07XG4gIC8vICAgdGhpcy5oZXJvZXMuZm9yRWFjaCgoaGVybywgaSkgPT4ge1xuICAvLyAgICAgaGVyby55ID0gdGhpcy5oZWlnaHQgLyAyO1xuICAvLyAgICAgaGVyby54ID0gKGkgKyAxKSAqIHRoaXMud2lkdGggLyAodGhpcy5oZXJvZXMubGVuZ3RoICsgMSk7XG4gIC8vICAgICBoZXJvLmN1cnNvciA9ICdwb2ludGVyJztcbiAgLy8gICAgIGhlcm8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnNlbGVjdEhlcm8oaGVybykpO1xuICAvLyAgICAgaGVyby5jYWNoZSgwLCAwLCBoZXJvLmJvdW5kcy53aWR0aCwgaGVyby5ib3VuZHMuaGVpZ2h0KTtcbiAgLy8gICB9KTtcbiAgLy8gICB0aGlzLmhlcm9GaWx0ZXIgPSBuZXcgY3JlYXRlanMuQ29sb3JGaWx0ZXIoMC42LCAwLjYsIDAuNik7XG4gIC8vICAgdGhpcy5yZXNldEhlcm9lcygpO1xuICAvLyAgIHRoaXMuYWRkQ2hpbGQoLi4udGhpcy5oZXJvZXMpO1xuICAvLyB9XG4gIC8vIHJlc2V0SGVyb2VzKCkge1xuICAvLyAgIHRoaXMuaGVyb2VzLmZvckVhY2goaGVybyA9PiB7XG4gIC8vICAgICBoZXJvLmZpbHRlcnMgPSBbdGhpcy5oZXJvRmlsdGVyXTtcbiAgLy8gICAgIGhlcm8udXBkYXRlQ2FjaGUoKTtcbiAgLy8gICAgIGhlcm8uc2NhbGVYID0gMC44NTtcbiAgLy8gICAgIGhlcm8uc2NhbGVZID0gMC44NTtcbiAgLy8gICB9KTtcbiAgLy8gfVxuICAvLyBzZWxlY3RIZXJvKGhlcm8pIHtcbiAgLy8gICB0aGlzLnJlc2V0SGVyb2VzKCk7XG5cbiAgLy8gICBoZXJvLmZpbHRlcnMgPSBbXTtcbiAgLy8gICBoZXJvLnVwZGF0ZUNhY2hlKCk7XG4gIC8vICAgaGVyby5zY2FsZVggPSAxO1xuICAvLyAgIGhlcm8uc2NhbGVZID0gMTtcbiAgLy8gICBoZXJvLmZsYXAoKTtcblxuICAvLyAgIGlmICghdGhpcy5zdGFydEJ0bi5lbmFibGVkKSB7XG4gIC8vICAgICB0aGlzLnN0YXJ0QnRuLmVuYWJsZSgpO1xuICAvLyAgIH1cblxuICAvLyAgIGRhdGFNYW5hZ2VyLmhlcm9UeXBlID0gaGVyby50eXBlO1xuICAvLyB9XG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5zdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XG4gICAgICBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ01haW5TY3JlZW4nKSk7XG4gICAgdGhpcy5wdnBCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PlxuICAgICAgc2NyZWVuc01hbmFnZXIuY2hhbmdlKCdQVlBTY3JlZW4nKSk7XG4gICAgdGhpcy5pbnZpdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PlxuICAgICAgc2VydmVyTWFuYWdlci5pbnZpdGUoKSk7XG5cbiAgICB0aGlzLm9uS2V5RG93biA9IGUgPT4ge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMzIpIHtcbiAgICAgICAgc2NyZWVuc01hbmFnZXIuY2hhbmdlKCdNYWluU2NyZWVuJyk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gIH1cbiAgZGVzdHJveSgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duKTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobWluLCBtYXgpIHtcblx0aWYgKG1heCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0bWF4ID0gbWluO1xuXHRcdG1pbiA9IDA7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1pbiAhPT0gJ251bWJlcicgfHwgdHlwZW9mIG1heCAhPT0gJ251bWJlcicpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhbGwgYXJndW1lbnRzIHRvIGJlIG51bWJlcnMnKTtcblx0fVxuXG5cdHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xufTtcbiJdfQ==
