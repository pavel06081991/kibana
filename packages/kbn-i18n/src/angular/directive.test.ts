/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import 'angular-mocks';
import angular from 'angular';
import { i18nDirective } from './directive';
import { i18nProvider } from './provider';

angular
  .module('app', [])
  .provider('i18n', (i18nProvider as any) as angular.IServiceProvider)
  .directive('i18nId', i18nDirective);

describe('i18nDirective', () => {
  let compile: angular.ICompileService;
  let scope: angular.IRootScopeService;

  beforeEach(angular.mock.module('app'));
  beforeEach(
    angular.mock.inject(
      ($compile: angular.ICompileService, $rootScope: angular.IRootScopeService) => {
        compile = $compile;
        scope = $rootScope.$new();
      }
    )
  );

  it('inserts correct translation html content', () => {
    const id = 'id';
    const defaultMessage = 'default-message';

    const element = angular.element(
      `<div
        i18n-id="${id}"
        i18n-default-message="${defaultMessage}"
      />`
    );

    compile(element)(scope);
    scope.$digest();

    expect(element.html()).toEqual(defaultMessage);
  });

  it('inserts correct translation html content with values', () => {
    const id = 'id';
    const defaultMessage = 'default-message {word}';
    const compiledContent = 'default-message word';

    const element = angular.element(
      `<div
        i18n-id="${id}"
        i18n-default-message="${defaultMessage}"
        i18n-values="{ word: 'word' }"
      />`
    );

    compile(element)(scope);
    scope.$digest();

    expect(element.html()).toEqual(compiledContent);
  });
});
