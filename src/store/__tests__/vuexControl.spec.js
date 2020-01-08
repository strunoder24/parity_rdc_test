import module from '../modules/controls'

describe('controlls module testing', () => {
    let state = module.state;
    
    it('returns valid summary', () => {
        expect(module.getters.getSummary(state)).toBe(1001000);
    });
    
    it('sets first value', () => {
        module.mutations.setFirst(state, 1);
        expect(state.first).toBe(1);
    });
    
    it('sets second value', () => {
        module.mutations.setSecond(state, 1);
        expect(state.second).toBe(1);
    });
    
    it('sets third value', () => {
        module.mutations.setThird(state, 1);
        expect(state.third).toBe(1);
    });
});