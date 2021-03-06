import Service from '@ember/service';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import {
  click,
  currentURL,
  visit,
  fillIn,
  triggerKeyEvent
} from '@ember/test-helpers';

let StubMapsService = Service.extend({
  getMapElement() {
    return Promise.resolve(document.createElement('div'));
  }
});



module('Acceptance | list rentals', function(hooks) {
  setupApplicationTest(hooks); // ensures that your Ember application is started and shut down between each test. 
  setupMirage(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:map-element', StubMapsService);
  });

  // simulate visit home page
  test('should show rentals as the home page', async function (assert) {
    await visit('/');
    assert.equal(currentURL(), '/rentals', 'should redirect automatically');
  });


  // simulate click on about button in header
  test('should link to information about the company.', async function (assert) {
    await visit('/');
    await click(".menu-about");
    assert.equal(currentURL(), '/about', 'should navigate to about');
  });

  // simulate click on contact button in header
  test('should link to contact information.', async function (assert) {
    await visit('/');
    await click(".menu-contact");
    assert.equal(currentURL(), '/contact', 'should navigate to contact');
  });

  test('should list available rentals.', async function (assert) {
    await visit('/');
    assert.equal(this.element.querySelectorAll('.listing').length, 3, 'should display 3 listings');

  });

  test('should filter the list of rentals by city.', async function (assert) {
    await visit('/');
    await fillIn('.list-filter input', 'seattle');
    await triggerKeyEvent('.list-filter input', 'keyup', 69);
    assert.equal(this.element.querySelectorAll('.results .listing').length, 1, 'should display 1 listing');
    assert.ok(this.element.querySelector('.listing .location').textContent.includes('Seattle'), 'should contain 1 listing with location Seattle');
  });

/*   test('should show details for a selected rental', async function (assert) {
  }); */


});
