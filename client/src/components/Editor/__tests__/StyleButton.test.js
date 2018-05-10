/* eslint-env and, jest */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';

import StyleButton from '../StyleButton';

Enzyme.configure({ adapter: new Adapter() });

describe('StyleButton', () => {
  let props;
  let mountedStyleButton;
  const styleButton = () => {
    if (!mountedStyleButton) {
      mountedStyleButton = mount(
        <StyleButton {...props} />,
      );
    }
    return mountedStyleButton;
  };

  beforeEach(() => {
    props = {
      style: 'BOLD',
      onToggle: (e) => { console.log(e); },
      className: undefined,
      label: '<em>B</em>',
      active: undefined,
      activeClass: '456',
    };
    mountedStyleButton = undefined;
  });

  it('always renders a span', () => {
    const spans = styleButton().find('span');
    expect(spans.length).toBeGreaterThan(0);
  });

  describe('the rendered span', () => {
    it('contains everything else that gets rendered', () => {
      const spans = styleButton().find('span');
      const wrappingSpan = spans.first();
      expect(wrappingSpan).toEqual(styleButton().children());
    });
    it('calls onToggle prop when clicked', () => {
      const callback = spy();
      props.onToggle = callback;
      const sButton = styleButton();
      const spans = sButton.find('span');
      const wrappingSpan = spans.first();
      wrappingSpan.simulate('click');
      expect(props.onToggle.calledOnce).toBe(true);
    });
  });

  describe('when `active` is true', () => {
    beforeEach(() => {
      props.className = '123';
      props.activeClass = '456';
      props.active = true;
    });

    it('adds the activeClass prop to the class of the wrapper', () => {
      const spans = styleButton().find('span');
      const wrappingDiv = spans.first();
      expect(wrappingDiv.props().className).toBe('123 456');
    });
  });

  describe('when `active` is false', () => {
    beforeEach(() => {
      props.className = '123';
      props.activeClass = '456';
      props.active = false;
    });

    it('does not add the activeClass prop to the class of the wrapper', () => {
      const spans = styleButton().find('span');
      const wrappingDiv = spans.first();
      expect(wrappingDiv.props().className).toBe('123');
    });
  });
});
