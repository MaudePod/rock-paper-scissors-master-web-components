export class Match {
    possibleMoves = [
        'paper',
        'spock',
        'lizard',
        'scissors',
        'rock'
    ];

    runMatch=(rulesForFirstPick, secondPick = "")=>{
        const result=this.getMatchResult(rulesForFirstPick);
        this.updateScore(result);
    }
    getMatchResult(rulesForFirstPick, secondPick = "") {
        console.log(secondPick)
        if (secondPick == "") {
            secondPick = this.getRandomCpuPick();
        }
        if (rulesForFirstPick.beats.find((element) => element == secondPick)) {
            console.log('lost to ',secondPick)
            return 1;
        }
        if (rulesForFirstPick.losesTo.find((element) => element == secondPick)) {
            return -1;
        }
        return 0;
    }
    getRandomCpuPick = () => {
        let randomIndex = Math.floor(Math.random() * this.possibleMoves.length)
        const cpuPick = this.possibleMoves[randomIndex];
        console.log(this.possibleMoves);
        console.log('cpuPick',cpuPick)
        return cpuPick;
    }
    updateScore=(matchResult)=>{
        if(localStorage.getItem('score')){
          const score=Number(localStorage.getItem('score'));
          localStorage.setItem('score',score+matchResult)
          
         }else{
          localStorage.setItem('score',matchResult)
         }
         window.dispatchEvent(new CustomEvent("score updated", { } ));
       }
}

