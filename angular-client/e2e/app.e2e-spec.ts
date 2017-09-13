import { AngularClientPage } from './app.po';

describe('angular-client App', function() {
  let page: AngularClientPage;

  beforeEach(() => {
    page = new AngularClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
