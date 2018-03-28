new Vue({
	el:'#app',
	data:{
		playerHealth:100,
		monsterHealth:100,
		gameIsRunning: false,
		turns:[]
	},
	methods:{
		startGame: function() {
			this.gameIsRunning= true;
			this.playerHealth=100;
			this.monsterHealth=100;
			this.turns=[];
		},
		attack: function() {
			var damage=this.calculateDamage(3,10);
			this.monsterHealth-=damage;
			this.turns.unshift({
				isPlayer: true,
				text: 'Jugador dañó al monstruo '+ damage + ' unidades'
			});
			if(this.checkWin()){
				return;
			}
			this.monsterAttacks();
		},
		specialAttack: function() {
			var damage=this.calculateDamage(10,20);
			this.monsterHealth-=damage;
			this.turns.unshift({
				isPlayer: true,
				text: 'Jugador dañó fuerte al monstruo '+ damage + ' unidades'
			});
			if(this.checkWin()){
				return;
			}
			this.monsterAttacks();
		},
		heal: function() {
			if(this.playerHealth<=90){
				this.playerHealth+=10;
			}else{
				this.playerHealth=100;
			}
			this.turns.unshift({
				isPlayer: true,
				text: 'Jugador se curó 10 unidades'
			});
			this.monsterAttacks();

		},
		giveUp: function() {
			this.gameIsRunning=false;
		},
		calculateDamage: function(min, max) {
			return Math.max(Math.floor(Math.random()*max)+1,min);
		},
		checkWin: function() {
			if(this.monsterHealth<=0){
				if (confirm('Ganaste!! Nuevo juego?')) {
					this.startGame();
				} else {
					this.gameIsRunning=false;
				}
				return true;
			}else if (this.playerHealth<=0) { 
				if (confirm('Perdiste!! Nuevo juego?')) {
					this.startGame();
				} else {
					this.gameIsRunning=false;
				}
				return true;
			}
			return false;
		},
		monsterAttacks: function() {
			var damage = this.calculateDamage(5,13);
			this.playerHealth-=damage;
			this.checkWin();
			this.turns.unshift({
				isPlayer: false,
				text: 'Monstruo dañó al jugador '+ damage + ' unidades'
			});
		}
	}
});