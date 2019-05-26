import Carrousel from '../../../src/components/carrousel';

describe('src/components/carrousel.js', () => {

  describe('Carrousel()', () => {
    const testCarrousel = new Carrousel();

    it('should be defined', () => {
      expect(Carrousel).toBeDefined();
    });

    it('instance should be defined', () => {
      expect(testCarrousel).toBeDefined();
      expect(testCarrousel).toBeTruthy();
    });

    it('connectedCallback() should be defined', () => {
      expect(testCarrousel.connectedCallback).toBeDefined();
    });

    it('addBullets() should be defined', () => {
      expect(testCarrousel.addBullets).toBeDefined();
    });

    it('moveTo() should be defined', () => {
      expect(testCarrousel.moveTo).toBeDefined();
    });
  });
});