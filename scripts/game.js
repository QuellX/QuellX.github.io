(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

var _ManuState = require('states/ManuState');

var _ManuState2 = _interopRequireDefault(_ManuState);

var _GameState = require('./states/GameState');

var _GameState2 = _interopRequireDefault(_GameState);

var _ResultState = require('./states/ResultState');

var _ResultState2 = _interopRequireDefault(_ResultState);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var game_option = {
	windowSize: {
		width: 800,
		height: 750
	}
};

var Game = function (_Phaser$Game) {
	_inherits(Game, _Phaser$Game);

	function Game() {
		_classCallCheck(this, Game);

		var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, game_option.windowSize.width, game_option.windowSize.height, Phaser.AUTO, 'content', null));

		_this.state.add('ManuState', _ManuState2.default, false);
		_this.state.add('GameState', _GameState2.default, false);
		_this.state.add('ResultState', _ResultState2.default, false);

		_this.state.start('ManuState');
		return _this;
	}

	_createClass(Game, [{
		key: 'playGame',
		value: function playGame() {
			this.state.start('GameState');
		}
	}]);

	return Game;
}(Phaser.Game);

new Game();

},{"./states/GameState":2,"./states/ResultState":4,"states/ManuState":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var GameState = function (_Phaser$State) {
  _inherits(GameState, _Phaser$State);

  function GameState() {
    _classCallCheck(this, GameState);

    var _this = _possibleConstructorReturn(this, (GameState.__proto__ || Object.getPrototypeOf(GameState)).call(this));

    _this.playAreaSize = {
      offsetX: 100,
      offsetY: 0,
      tilePaddingTopAndBottom: 0,
      tilePaddingLeftAndRight: 0,
      tileWidth: 0,
      tileHeight: 0
    };

    _this.gridSize = {
      width: 7,
      height: 7
    };

    _this.tileList = ['gem_01', 'gem_02', 'gem_03', 'gem_04', 'gem_05', 'gem_06'];
    _this.tilesArray = _this.generateTilesMatrix();

    _this.selectedTile = null;
    _this.tilesGroup = null;

    _this.score = 0;
    _this.scoreText = null;

    _this.timer = 120;
    _this.restOfTime = _this.timer;

    _this.cursorDisabled = false;
    return _this;
  }

  _createClass(GameState, [{
    key: 'preload',
    value: function preload() {
      this.load.image('background', './assets/images/backgrounds/background.jpg');

      this.load.image('score', './assets/images/bg-score.png');

      this.load.image('gem_01', './assets/images/game/gem-01.png');
      this.load.image('gem_02', './assets/images/game/gem-02.png');
      this.load.image('gem_03', './assets/images/game/gem-03.png');
      this.load.image('gem_04', './assets/images/game/gem-04.png');
      this.load.image('gem_05', './assets/images/game/gem-05.png');
      this.load.image('gem_06', './assets/images/game/gem-06.png');

      this.load.audio('select', './assets/audio/select-1.mp3');
      this.load.audio('kill', './assets/audio/kill.mp3');
    }
  }, {
    key: 'create',
    value: function create() {
      var _this2 = this;

      //Set background
      var bg = this.add.sprite(-20, -20, 'background');
      bg.scale.setTo(0.95);

      //Set score board 
      var scroreBoard = this.add.sprite(-65, 0, 'score');
      this.playAreaSize.offsetY = scroreBoard.height - 50;

      //Score text
      this.scoreText = this.add.text(scroreBoard.width / 4 + 20, scroreBoard.height / 2 - 40, '0', { fontSize: '44px', fill: '#fff' });

      //Score text
      this.timeText = this.add.text(this.game.width - 250, scroreBoard.height / 2 - 40, 'Time: ' + this.timer, { fontSize: '44px', fill: '#000' });

      //Add background music
      this.killMusic = this.add.audio('kill');
      this.selectMusic = this.add.audio('select');

      //Show Donuts
      setTimeout(function () {
        _this2.startTimer();
        _this2.drawTiles();
      }, 200);
      // this.startTimer();
      // this.drawTiles();
    }
  }, {
    key: 'generateTilesMatrix',
    value: function generateTilesMatrix() {
      var tilesMatrix = [];
      var tilesRow = [];

      for (var row = 0; row < this.gridSize.height; row++) {
        for (var col = 0; col < this.gridSize.width; col++) {

          var randomTileIndex = Math.floor(Math.random() * this.tileList.length);
          tilesRow.push(this.tileList[randomTileIndex]);
        };

        tilesMatrix.push(tilesRow);
        tilesRow = [];
      };

      return tilesMatrix;
    }
  }, {
    key: 'drawTiles',
    value: function drawTiles() {
      var _this3 = this;

      var tilesGroup = void 0;

      //Create Tiles Group to hol All Tiles

      if (this.tilesGroup) {
        tilesGroup = this.tilesGroup;
      } else {
        tilesGroup = this.add.group();
      };

      //Reset all children(required for redraw)
      tilesGroup.removeAll(true);

      for (var row = 0; row < this.tilesArray.length; row++) {
        for (var col = 0; col < this.tilesArray[row].length; col++) {
          //Add Donut
          var tile = tilesGroup.create(0, 0, this.tilesArray[row][col]);
          tile.scale.setTo(0.75);
          this.setTileSize(tile);
          this.calculatePadding();

          //Set Donut Position
          tile.x = this.playAreaSize.offsetX + col * (tile.width + this.playAreaSize.tilePaddingLeftAndRight);
          tile.y = this.playAreaSize.offsetY + row * (tile.height + this.playAreaSize.tilePaddingTopAndBottom);

          //Select Event
          tile.inputEnabled = true;
          tile.events.onInputDown.add(async function (tile) {
            await _this3.selectTile(tile);
          }, this);

          //Add Matrix Coords
          tile.row = row;
          tile.col = col;
        };
      };

      this.tilesGroup = tilesGroup;

      this.destroyMatchedTiles();
    }
  }, {
    key: 'setTileSize',
    value: function setTileSize(tile) {
      // Dynamic Tile Size Set
      this.playAreaSize.tileWidth = tile.width;
      this.playAreaSize.tileHeight = tile.height;
    }
  }, {
    key: 'calculatePadding',
    value: function calculatePadding() {
      // Dynamic Left Padding Calculation
      this.playAreaSize.tilePaddingLeftAndRight = (this.game.width - this.playAreaSize.offsetX * 2 - this.playAreaSize.tileWidth * this.gridSize.width) / (this.gridSize.width - 1);
    }
  }, {
    key: 'selectTile',
    value: function selectTile(tile) {

      if (this.cursorDisabled) return;

      tile.alpha = 0.65;
      this.selectMusic.play();

      //Swap Tiles
      if (this.selectedTile) {
        tile.alpha = 1;
        this.selectedTile.alpha = 1;

        //Check if swap available
        if (!this.isSwapAvailable(this.selectedTile, tile)) {
          this.selectedTile = null;
          return;
        };

        //Swap Tiles
        this.swapTiles(tile);

        return;
      };

      this.selectedTile = tile;
    }
  }, {
    key: 'swapTiles',
    value: function swapTiles(tile) {
      var _this4 = this;

      var bufferFirstValue = this.tilesArray[tile.row][tile.col];
      var bufferSecondValue = this.tilesArray[this.selectedTile.row][this.selectedTile.col];

      {
        var tilesArrayShallowCopy = JSON.parse(JSON.stringify(this.tilesArray));
        tilesArrayShallowCopy[tile.row][tile.col] = bufferSecondValue;
        tilesArrayShallowCopy[this.selectedTile.row][this.selectedTile.col] = bufferFirstValue;

        if (this.getMatch(tilesArrayShallowCopy)[0] === undefined) {
          this.cursorDisabled = true;
          //Visual Swap
          var _ref = [tile.position.x, this.selectedTile.position.x];
          this.selectedTile.position.x = _ref[0];
          tile.position.x = _ref[1];
          var _ref2 = [tile.position.y, this.selectedTile.position.y];
          this.selectedTile.position.y = _ref2[0];
          tile.position.y = _ref2[1];

          setTimeout(function () {
            var _ref3 = [tile.position.x, _this4.selectedTile.position.x];
            //Visual Swap BAck

            _this4.selectedTile.position.x = _ref3[0];
            tile.position.x = _ref3[1];
            var _ref4 = [tile.position.y, _this4.selectedTile.position.y];
            _this4.selectedTile.position.y = _ref4[0];
            tile.position.y = _ref4[1];

            _this4.selectedTile = null;
            _this4.cursorDisabled = false;
          }, 200);

          return;
        };
      }

      this.tilesArray[tile.row][tile.col] = bufferSecondValue;
      this.tilesArray[this.selectedTile.row][this.selectedTile.col] = bufferFirstValue;

      this.drawTiles();

      //Visual Swap
      // [this.selectedTile.position.x, tile.position.x] = [tile.position.x, this.selectedTile.position.x];
      // [this.selectedTile.position.y, tile.position.y] = [tile.position.y, this.selectedTile.position.y];

      this.selectedTile = null;
    }
  }, {
    key: 'isSwapAvailable',
    value: function isSwapAvailable(firsTile, secondTile) {
      if (firsTile.position.x === secondTile.position.x && Math.abs(firsTile.position.y - secondTile.position.y) < 2 * this.playAreaSize.tileHeight + this.playAreaSize.tilePaddingTopAndBottom && firsTile.key != secondTile.key) {
        return true;
      };
      if (firsTile.position.y === secondTile.position.y && Math.abs(firsTile.position.x - secondTile.position.x) < 2 * this.playAreaSize.tileWidth + this.playAreaSize.tilePaddingLeftAndRight && firsTile.key != secondTile.key) {
        return true;
      };
    }
  }, {
    key: 'getMatch',
    value: function getMatch(matrix) {
      var matchList = [];

      //Horizontal Check Match
      for (var row = 0; row < this.gridSize.height; row++) {
        var match = 1;

        for (var col = 0; col < this.gridSize.width; col++) {

          //Check If Last Tile
          if (col + 1 === this.gridSize.width) {
            if (match >= 3) {
              matchList.push({
                length: match, startPoint: {
                  row: row,
                  col: col + 1 - match
                }, horizontal: true
              });
              break;
            };
          };

          if (col != this.gridSize.height - 1) {
            //Increase Match Value
            if (matrix[row][col] === matrix[row][col + 1]) {
              match += 1;
            };

            //Reset Match Value
            if (matrix[row][col] != matrix[row][col + 1] && match < 3) {
              match = 1;
            };

            //Save Match Value
            if (matrix[row][col] != matrix[row][col + 1]) {
              if (match >= 3) {
                matchList.push({
                  length: match, startPoint: {
                    row: row,
                    col: col + 1 - match
                  }, horizontal: true
                });
                match = 1;
              };
            };
          };
        };
      };

      // Vertical Check Match
      for (var _col = 0; _col < this.gridSize.width; _col++) {
        var _match = 1;

        for (var _row = 0; _row < this.gridSize.height; _row++) {

          //Check If Last Tile
          if (_row + 1 === this.gridSize.height) {
            if (_match >= 3) {
              matchList.push({
                length: _match, startPoint: {
                  row: _row + 1 - _match,
                  col: _col
                }, horizontal: false
              });
              break;
            }
          }

          if (_row != this.gridSize.height - 1) {
            //Increase Match Value
            if (matrix[_row][_col] === matrix[_row + 1][_col]) {
              _match += 1;
            };

            //Reset Match Value
            if (matrix[_row][_col] != matrix[_row + 1][_col] && _match < 3) {
              _match = 1;
            };

            //Save Match Value
            if (matrix[_row][_col] != matrix[_row + 1][_col]) {
              if (_match >= 3) {
                matchList.push({
                  length: _match, startPoint: {
                    row: _row + 1 - _match,
                    col: _col
                  }, horizontal: false
                });
                _match = 1;
              };
            };
          };
        };
      };

      return matchList;
    }
  }, {
    key: 'destroyMatchedTiles',
    value: function destroyMatchedTiles() {
      var _this5 = this;

      var matchedTiles = this.getMatch(this.tilesArray);
      if (matchedTiles[0] === undefined) {
        this.cursorDisabled = false;
        return;
      };

      this.cursorDisabled = true;

      var destructionArray = [];

      //Fill destructionArray with false values
      for (var i = 0; i < this.gridSize.width * this.gridSize.height; i++) {
        destructionArray[i] = false;
      };

      //Add destruction item's index to destructionArray
      matchedTiles.map(function (_ref5) {
        var length = _ref5.length,
            _ref5$startPoint = _ref5.startPoint,
            row = _ref5$startPoint.row,
            col = _ref5$startPoint.col,
            horizontal = _ref5.horizontal;

        //Horizontal Matches
        if (horizontal) {
          var startPosition = row * _this5.gridSize.width + col;
          var endPosition = startPosition + length;

          for (var _i = startPosition; _i < endPosition; _i++) {
            destructionArray[_i] = true;
            _this5.increseScore(1);
          };
        };

        //Vertical Matches
        if (!horizontal) {
          var _startPosition = row * _this5.gridSize.width + col;
          var _endPosition = _startPosition + (length - 1) * _this5.gridSize.width;

          for (var _i2 = _startPosition; _i2 <= _endPosition; _i2 += _this5.gridSize.width) {
            destructionArray[_i2] = true;
            _this5.increseScore(1);
          };
        };
      });

      //Remove Children

      var _loop = function _loop(_i3) {
        if (destructionArray[_i3]) {
          setTimeout(function () {
            _this5.tilesGroup.children[_i3].alpha = 0.5;
          }, 1000);
        };
      };

      for (var _i3 = 0; _i3 < this.gridSize.width * this.gridSize.height; _i3++) {
        _loop(_i3);
      };

      this.killMusic.play();

      setTimeout(function () {
        _this5.updateTilesArray(destructionArray);
      }, 500);
    }
  }, {
    key: 'updateTilesArray',
    value: function updateTilesArray(destructionArray) {
      var _this6 = this;

      //Build Deleted Objects Map
      var index = 0;

      // const tilesArrayShallowCopy = this.tilesArray.concat(); //.concat() and spread don't give shallow copy. Keeps refer to original array. Babel bug?
      // const tilesArrayShallowCopy = [...this.tilesArray];
      var tilesArrayShallowCopy = [].concat(_toConsumableArray(this.tilesArray));
      var tilesArrayShallowCopyString = JSON.stringify(this.tilesArray);

      for (var row = 0; row < this.tilesArray.length; row++) {
        for (var col = 0; col < this.tilesArray[row].length; col++) {
          tilesArrayShallowCopy[row][col] = destructionArray[index];
          index++;
        };
      };

      this.tilesArray = JSON.parse(tilesArrayShallowCopyString);

      //Delete Matched Tiles From tilesArray
      for (var _row2 = 0; _row2 < this.tilesArray.length; _row2++) {
        for (var _col2 = 0; _col2 < this.tilesArray[_row2].length; _col2++) {
          if (tilesArrayShallowCopy[_row2][_col2]) {
            tilesArrayShallowCopy[_row2][_col2] = null;
          } else {
            tilesArrayShallowCopy[_row2][_col2] = this.tilesArray[_row2][_col2];
          };
        };
      };

      //Shift Values Down, 'null' up. Iteration required to up all 'null' above values
      for (var iteration = 0; iteration < this.tilesArray.length; iteration++) {
        for (var _row3 = this.tilesArray.length - 1; _row3 > 0; _row3--) {
          for (var _col3 = this.tilesArray[_row3].length - 1; _col3 > -1; _col3--) {

            if (tilesArrayShallowCopy[_row3][_col3] === null) {

              //Swap values if required
              if (tilesArrayShallowCopy[_row3 - 1][_col3] !== null) {

                tilesArrayShallowCopy[_row3][_col3] = tilesArrayShallowCopy[_row3 - 1][_col3];
                tilesArrayShallowCopy[_row3 - 1][_col3] = null;
              };
            };
          };
        };
      };

      //Fill arrray where empty('null') 
      for (var _row4 = 0; _row4 < this.tilesArray.length; _row4++) {
        for (var _col4 = 0; _col4 < this.tilesArray[_row4].length; _col4++) {
          if (tilesArrayShallowCopy[_row4][_col4] === null) {
            var randomTileIndex = Math.floor(Math.random() * this.tileList.length);
            tilesArrayShallowCopy[_row4][_col4] = this.tileList[randomTileIndex];
          };
        };
      };

      this.tilesArray = tilesArrayShallowCopy;

      setTimeout(function () {
        _this6.drawTiles();
      }, 2000);
    }
  }, {
    key: 'increseScore',
    value: function increseScore(score) {
      this.score += score * 25;

      this.scoreText.text = this.score;
    }
  }, {
    key: 'startTimer',
    value: function startTimer() {
      var _this7 = this;

      this.timeIntervalID = setInterval(function () {
        _this7.updateTimer();
      }, 1000);
    }
  }, {
    key: 'updateTimer',
    value: function updateTimer() {
      if (this.restOfTime > 0) {
        //Update Time
        this.restOfTime = this.restOfTime - 1;
        this.timeText.text = 'Time: ' + this.restOfTime;
        if (this.restOfTime < 2) this.cursorDisabled = true;
      } else {
        //Go to result screen
        this.game.gameScore = this.score;
        clearInterval(this.timeIntervalID);
        this.state.start('ResultState');
      };
    }
  }]);

  return GameState;
}(Phaser.State);

;

exports.default = GameState;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var ManuState = function (_Phaser$State) {
	_inherits(ManuState, _Phaser$State);

	function ManuState() {
		_classCallCheck(this, ManuState);

		var _this = _possibleConstructorReturn(this, (ManuState.__proto__ || Object.getPrototypeOf(ManuState)).call(this));

		_this.muteMusic = false;
		return _this;
	}

	_createClass(ManuState, [{
		key: 'preload',
		value: function preload() {
			this.load.image('background', './assets/images/backgrounds/background.jpg');
			this.load.image('sfx', './assets/images/btn-sfx.png');
			this.load.image('logo', './assets/images/donuts_logo.png');
			this.load.image('btn-play', './assets/images/btn-play.png');

			this.load.audio('background', './assets/audio/background.mp3');
		}
	}, {
		key: 'create',
		value: function create() {
			//Add background music
			this.backgroundMusic = this.add.audio('background');
			this.backgroundMusic.play('', 0, 1, true);
			//Set background
			var bg = this.add.sprite(-20, -20, 'background');
			bg.scale.setTo(0.95);

			//Set sfx button
			var btn_sfx = this.add.sprite(0, 5, 'sfx');
			btn_sfx.scale.setTo(0.75);
			btn_sfx.x = this.game.width - btn_sfx.width - 5;

			//Click button event
			btn_sfx.inputEnabled = true;
			btn_sfx.events.onInputDown.add(this.muteBackgroundMusic, this);

			//Set logo
			var logo = this.add.sprite(0, 0, 'logo');
			logo.scale.setTo(0.9);
			logo.x = this.game.width / 2 - logo.width / 2;
			logo.y = logo.height * 0.5;

			//Set play button
			var btn_play = this.add.sprite(0, 0, 'btn-play');
			btn_play.scale.setTo(0.95);
			btn_play.x = this.game.width / 2 - btn_play.width / 2;
			btn_play.y = logo.y + logo.height + 30;

			//Click button event
			btn_play.inputEnabled = true;
			btn_play.events.onInputDown.add(this.playGame, this);
		}
	}, {
		key: 'playGame',
		value: function playGame(sprite) {
			var _this2 = this;

			sprite.alpha = 0.85;
			//---Kind of animation ---\\
			setTimeout(function () {
				sprite.alpha = 1;
			}, 100);
			setTimeout(function () {
				_this2.state.start('GameState');
			}, 500);
		}
	}, {
		key: 'muteBackgroundMusic',
		value: function muteBackgroundMusic(sprite) {
			this.muteMusic = !this.muteMusic;

			sprite.alpha = 0.85;
			setTimeout(function () {
				sprite.alpha = 1;
			}, 100);

			if (this.muteMusic) {
				this.backgroundMusic.volume = 0;
			} else {
				this.backgroundMusic.volume = 1;
			};
		}
	}]);

	return ManuState;
}(Phaser.State);

exports.default = ManuState;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var ResultState = function (_Phaser$State) {
    _inherits(ResultState, _Phaser$State);

    function ResultState() {
        _classCallCheck(this, ResultState);

        return _possibleConstructorReturn(this, (ResultState.__proto__ || Object.getPrototypeOf(ResultState)).apply(this, arguments));
    }

    _createClass(ResultState, [{
        key: 'preload',
        value: function preload() {
            this.load.image('background', './assets/images/backgrounds/background.jpg');
            this.load.image('timeup', './assets/images/text-timeup.png');
            this.load.image('score', './assets/images/bg-score.png');

            this.load.image('particle_ex1', './assets/images/particles/particle_ex1.png');
            this.load.image('particle_ex2', './assets/images/particles/particle_ex2.png');
            this.load.image('particle_ex3', './assets/images/particles/particle_ex3.png');
            this.load.image('particle_1', './assets/images/particles/particle-1.png');
            this.load.image('particle_2', './assets/images/particles/particle-2.png');
            this.load.image('particle_3', './assets/images/particles/particle-3.png');
            this.load.image('particle_4', './assets/images/particles/particle-4.png');
            this.load.image('particle_5', './assets/images/particles/particle-5.png');
        }
    }, {
        key: 'create',
        value: function create() {
            //Set background
            var bg = this.add.sprite(-20, -20, 'background');
            bg.scale.setTo(0.95);

            //Particles
            var particles_1 = this.add.emitter(-15, -15, 250);
            particles_1.makeParticles(['particle_ex1', 'particle_ex2', 'particle_ex3', 'particle_1', 'particle_2', 'particle_3', 'particle_4', 'particle_5']);
            particles_1.minParticleSpeed.setTo(-300, -300);
            particles_1.maxParticleSpeed.setTo(3000, 3000);

            particles_1.minRotation = 50;
            particles_1.maxRotation = 50;

            particles_1.start(false, 3000, 10);

            //Set timeup text
            var timeup = this.add.sprite(0, 0, 'timeup');
            timeup.x = this.game.width / 2 - timeup.width / 2;
            timeup.y = 100;

            //Set score 
            var scroreBoard = this.add.sprite(0, 0, 'score');
            scroreBoard.x = this.game.width / 2 - scroreBoard.width / 2;
            scroreBoard.y = 100 + timeup.height + 50;

            //Score text
            var scoreText = this.add.text(50, 50, this.game.gameScore, { fontSize: '44px', fill: '#fff' });
            scoreText.x = this.game.width / 2 - 40;
            scoreText.y = scroreBoard.y + scroreBoard.height / 2 - 40;
        }
    }]);

    return ResultState;
}(Phaser.State);

;

exports.default = ResultState;

},{}]},{},[1])
//# sourceMappingURL=game.js.map
