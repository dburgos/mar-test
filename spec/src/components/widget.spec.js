import Widget from '../../../src/components/widget.js';

describe('src/components/widget.js', () => {

  describe('Widget()', () => {
    const testWidget = new Widget();
    const data = require('../../../data/revenue.json');

    it('should be defined', () => {
      expect(Widget).toBeDefined();
    });

    it('instance should be defined', () => {
      expect(testWidget).toBeDefined();
      expect(testWidget).toBeTruthy();
    });

    it('connectedCallback() should be defined', () => {
      expect(testWidget.connectedCallback).toBeDefined();
    });

    it('render() should be defined', () => {
      expect(testWidget.render).toBeDefined();
    });

    describe('precalculate()', () => {
      it('should be defined', () => {
        expect(testWidget.precalculate).toBeDefined();
      });

      it('should return 0 when no data', () => {
        const out = testWidget.precalculate();
        expect(out.list).toBeDefined();
        expect(out.list.length).toBe(0);
        expect(out.smartphonePercent).toBe(0);
        expect(out.smartphoneTotal).toBe(0);
        expect(out.tabletPercent).toBe(0);
        expect(out.tabletTotal).toBe(0);
        expect(out.total).toBe(0);
      });

      it('should precalculate succesfully', () => {
        const out = testWidget.precalculate(data);
        expect(out.list).toBeDefined();
        expect(out.list.length).toBe(12);
        expect(out.smartphonePercent).toBe(40);
        expect(out.smartphoneTotal).toBe(80000);
        expect(out.tabletPercent).toBe(60);
        expect(out.tabletTotal).toBe(120000);
        expect(out.total).toBe(200000);
      });
    });

    describe('rendering...', () => {
      let mounted;
      let error;
      beforeAll(() => {
        try {
          const testElement = document.createElement('demo-widget');
          testElement.setAttribute('data-source', 'revenue');
          mounted = document.body.appendChild(testElement);
        } catch (err) {
          error = err;
        }
      });

      it('should do it without error', () => {
        expect(error).not.toBeDefined();
      });

      it('should render it succesfully', () => {
        expect(mounted).toBeDefined();
      });

      it('should use blue color if undefined', () => {
        const element = document.getElementsByTagName('demo-widget')[0];
        const color = element.colorScheme;
        expect(color).toBe('blue');
      });
    });
  });
});