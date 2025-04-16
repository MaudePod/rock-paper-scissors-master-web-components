export class Rules {
    beats = [];
    losesTo = [];
    title = "";
    constructor(title) {
        this.title = title;
    }

}

export class RockRules extends Rules {
    losesTo = ['paper', 'spock'];
    beats = ['lizard', 'scissors'];
}

export class ScissorsRules extends Rules {
    losesTo = ['spock', 'rock'];
    beats = ['paper', 'lizard'];
}
export class LizardRules extends Rules {
    losesTo = ['rock', 'scissors'];
    beats = ['spock', 'paper'];
}
export class SpockRules extends Rules {
    losesTo = ['lizard', 'paper'];
    beats = ['scissors', 'rock'];
} 
export class PaperRules extends Rules {
    losesTo = ['scissors', 'lizard'];
    beats = ['rock', 'spock'];
}

