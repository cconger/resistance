var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('hello world\n');
}).listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080');

var GAMESTATES = {
  UNKNOWN:    'unknown',
  PENDING:    'pending',
  ASSEMBLING: 'assembling',
  VOTING:     'voting',
  EXECUTING:  'executing',
  FAILED:     'failed',
  SUCCEEDED:  'succeeded'
};

var ALLEGENCES = {
  UNKNOWN:    'unknown',
  SPY:        'spy',
  RESISTANCE: 'resistance',
};

var VOTE = {
  APPROVE: 'approve',
  REJECT:  'reject'
};

var MISSION = {
  FAIL: 'fail',
  SUCCEED: 'succeed'
};

var Mission = function(config) {
  this.state = GAMESTATES.UNKNOWN;
  this.leader = null;
  this.team = [];
  // Map of player names to votes for the proposed team
  this.votes = {};
  this.requiredFails = 0;
  this.requiredPlayers = 0;
};

var GameState = function(config) {
  // Pointer to the current active mission.
  this.currentMission = null;
  // Array of all missions in the game
  this.missions = [];
  // Score of passed and failed missions
  this.missionsPassed = 0;
  this.missionsFailed = 0;
  // Array of all the player objects
  this.players = [];
  // Map of accusations (meta game allowing bots to accuse each other)
  this.accusations = {};
  // Array of all players who are on the spy team
  this.spies = [];
  // Array of all players who are on the resistance team
  this.resistance = [];
  // Allegance of the team that won. (null if game is still underway)
  this.winner = null;
};

var Game = function(config) {
  this.players = [];
  this.gameState = new GameState();
};

var PlayerAgent = function(config) {
  // This is the proxy for calling into the player, and providing callbacks,
  // This also is what times them out.
  // This will also have to create a shallow clone of the game state that is
  // read only and allows access to the different sets of data available.
};


//EXAMPLE PLAYER BELOW

var Player = function(config) {
  // This is the default type of the agent people will make
  this.myAllegence = ALLEGENCES.UNKOWN;
};

// Game Init
Player.prototype.gameInit = function(allegence) {
  this.myAllegence = allegence;
  this.friends = [];
};

Player.prototype.gameStart = function(gameState) {
  if (this.myAllegence === ALLEGENCES..SPY) {
    this.friends = gameState.spies;
  }
};

Player.prototype.chooseTeam = function(gameState, callback) {
  var players = gameState.players;
};

Player.prototype.voteOnTeam = function(gameState, callback) {
  callback(VOTE.APPROVE);
};

Player.prototype.goOnMission = function(gameState, callback) {
  if (this.myAllegence === ALLEGENCES.SPY) {
    callback(MISSION.FAIL);
  } else {
    callback(MISSION.SUCCEED);
  }
};

Player.prototype.missionCompleted = function(gameState) {
  if ((this.myAllegence === ALLEGENCES.SPY &&
       gameState.currentMission.state === GAME_STATES.FAILED) ||
      (this.myAllegence === ALLEGENCES.RESISTANCE &&
       gameState.currentMission.state === GAME_STATES.SUCCEEDED)) {
         console.log("WOO");
  } else {
    console.log("D'AWW");
  }
};

Player.prototype.gameOver = function(gameState) {
  if (this.myAllegence === gameState.winner) {
    console.log("I WON!");
  } else {
    console.log("I LOST!");
  }
};

