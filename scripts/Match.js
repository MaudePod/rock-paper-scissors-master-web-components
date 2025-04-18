export class Match {
    possibleMoves = [
        'paper',
        'spock',
        'lizard',
        'scissors',
        'rock'
    ];
    result = Object.freeze({
        player: 1,
        cpu: -1,
        draw: 0
    }
    )
    runMatch = (rulesForFirstPick, secondPick = "") => {
        if (secondPick == "") {
            secondPick = this.getRandomCpuPick();
            window.dispatchEvent(new CustomEvent("cpu picked move", {
                detail: { type: secondPick }
            }));
        }
        const result = this.getMatchResult(rulesForFirstPick, secondPick);
        this.updateScore(result);
        this.announceWinner(result);
    }
    getMatchResult(rulesForFirstPick, secondPick) {
        if (rulesForFirstPick.beats.find((element) => element == secondPick)) {
            return this.result.player;
        }
        if (rulesForFirstPick.losesTo.find((element) => element == secondPick)) {
            return this.result.cpu;
        }
        return this.result.draw;
    }
    getRandomCpuPick = () => {
        let randomIndex = Math.floor(Math.random() * this.possibleMoves.length)
        const cpuPick = this.possibleMoves[randomIndex];
        return cpuPick;
    }
    updateScore = (matchResult) => {
        if (localStorage.getItem('score')) {
            const score = Number(localStorage.getItem('score'));
            localStorage.setItem('score', score + matchResult)

        } else {
            localStorage.setItem('score', matchResult)
        }
        window.dispatchEvent(new CustomEvent("score updated", {}));
    }
    announceWinner = (result) => {
        const winner = Object.keys(this.result).find((value) => this.result[value] == result);
        window.dispatchEvent(new CustomEvent("winner announced", {
            detail: { winner: winner }
        }));

    }
}

