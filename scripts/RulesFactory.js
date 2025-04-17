import { RockRules, ScissorsRules, LizardRules, SpockRules, PaperRules } from "./Rules.js";
export default class RulesFactory {
    getRules(type) {
        switch (type) {
            case 'rock':
                return new RockRules(type);
            case 'scissors':
                return new ScissorsRules(type);
            case 'lizard':
                return new LizardRules(type);
            case 'spock':
                return new SpockRules(type);
            case 'paper':
                return new PaperRules(type);
            default:
                break;
        }
    }
}


