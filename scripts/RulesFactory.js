import { RockRules, ScissorsRules, LizardRules, SpockRules, PaperRules } from "./Rules.js";
export default class RulesFactory {
    getRules(type) {
        switch (type) {
            case 'rock':
                return new RockRules(type);
                break;
            case 'scissors':
                return new ScissorsRules(type);
                break;
            case 'lizard':
                return new LizardRules(type);
                break;
            case 'spock':
                return new SpockRules(type);
                break;
            case 'paper':
                return new PaperRules(type);
                break;
            default:
                break;
        }
    }
}


