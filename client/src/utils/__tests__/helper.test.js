/* eslint-env and, jest */
/* eslint max-len: off, no-use-before-define: off */
import expect from 'expect';
import tokenizer from '../../../../server/src/util/runTokenizer';

import * as StringParser from '../stringParser';

jest.setTimeout(10000);

describe('joinTextArray on segment set 1', () => {
  it('1 should join a text array with correct punctuation', () => {
    const inputString = 'The expected string should have quotes "in the correct place"';
    const expectedString = 'The expected string should have quotes "in the correct place"';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('2 should join a text array with correct punctuation', () => {
    const inputString = '"Before, planes could not be compared, neither by the performance of the engine nor by the materials used in its construction.';
    const expectedString = '"Before, planes could not be compared, neither by the performance of the engine nor by the materials used in its construction.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('3 should join a text array with correct punctuation', () => {
    const inputString = '"As the gap between spacecraft and commercial aircraft closes, I foresee a growth of supersonic flights over the next 5 to 10 years, " he adds.';
    const expectedString = '"As the gap between spacecraft and commercial aircraft closes, I foresee a growth of supersonic flights over the next 5 to 10 years," he adds.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('4 should join a text array with correct punctuation', () => {
    const inputString = '"What is now a 26-hour flight with three stops may be a nonstop flight. "';
    const expectedString = '"What is now a 26-hour flight with three stops may be a nonstop flight."';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('5 should join a text array with correct punctuation', () => {
    const inputString = 'Sandvik Coromant contributes by improving parts and materials, and collaborating with organisms like NASA.';
    const expectedString = 'Sandvik Coromant contributes by improving parts and materials, and collaborating with organisms like NASA.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(expectedString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('6 should join a text array with correct punctuation', () => {
    const inputString = '"Productivity is not a priority for the space industry, " says Holt.';
    const expectedString = '"Productivity is not a priority for the space industry," says Holt.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('7 should join a text array with correct punctuation', () => {
    const inputString = '"For NASA, the important thing is not how quickly certain parts can be manufactured, but the post-mechanized.';
    const expectedString = '"For NASA, the important thing is not how quickly certain parts can be manufactured, but the post-mechanized.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('8 should join a text array with correct punctuation', () => {
    const inputString = 'Being subjected to high thermal and mechanical stresses, they have to be perfect. "';
    const expectedString = 'Being subjected to high thermal and mechanical stresses, they have to be perfect."';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('9 should join a text array with correct punctuation', () => {
    const inputString = 'TAs an industrial member of the Commonwealth Center for Advanced Manufacturing, an advanced application center, Sandvik Coromant is also researching.';
    const expectedString = 'TAs an industrial member of the Commonwealth Center for Advanced Manufacturing, an advanced application center, Sandvik Coromant is also researching.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(expectedString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('10 should join a text array with correct punctuation', () => {
    const inputString = '"It\'s an R & D environment, " explains Holt.';
    const expectedString = '"It\'s an R & D environment," explains Holt.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('11 should join a text array with correct punctuation', () => {
    const inputString = '"We are a collaborator and NASA as well; our goal is to develop new manufacturing methods for new materials.';
    const expectedString = '"We are a collaborator and NASA as well; our goal is to develop new manufacturing methods for new materials.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('12 should join a text array with correct punctuation', () => {
    const inputString = 'New thermoresistant nickel based composites and alloys arrive.';
    const expectedString = 'New thermoresistant nickel based composites and alloys arrive.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('13 should join a text array with correct punctuation', () => {
    const inputString = 'We also investigate in fields other than cutting tools, such as 3D printing. "';
    const expectedString = 'We also investigate in fields other than cutting tools, such as 3D printing."';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('14 should join a text array with correct punctuation', () => {
    const inputString = 'It\'s a slow job and the failure rate is high.';
    const expectedString = 'It\'s a slow job and the failure rate is high.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('15 should join a text array with correct punctuation', () => {
    const inputString = 'It will be a decade before the production phase is reached, says Holt.';
    const expectedString = 'It will be a decade before the production phase is reached, says Holt.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('16 should join a text array with correct punctuation', () => {
    const inputString = '"When we start to leave the Earth\'s atmosphere, space exploration will consist mostly of unmanned flights, " he says.';
    const expectedString = '"When we start to leave the Earth\'s atmosphere, space exploration will consist mostly of unmanned flights," he says.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('17 should join a text array with correct punctuation', () => {
    const inputString = '"We can go higher and farther without risking human lives.';
    const expectedString = '"We can go higher and farther without risking human lives.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('18 should join a text array with correct punctuation', () => {
    const inputString = '"I would love to travel to space and I would like to go as far as technology allows, " continues Holt.';
    const expectedString = '"I would love to travel to space and I would like to go as far as technology allows," continues Holt.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('19 should join a text array with correct punctuation', () => {
    const inputString = '"Reach places where no one has been able to reach, as in the Star Trek series.';
    const expectedString = '"Reach places where no one has been able to reach, as in the Star Trek series.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('20 should join a text array with correct punctuation', () => {
    const inputString = 'That\'s why I dedicate myself to this. "';
    const expectedString = 'That\'s why I dedicate myself to this."';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });
});

describe('joinTextArray on segment set 2', () => {
  it('0 should join a text array with correct punctuation', () => {
    const inputString = 'Bezos, Blue Origin, is working on a launcher capable of taking passengers beyond the Kármán line, as will SpaceShipTwo, Virgin Galactic\'s ship, which will reach an altitude of 110 kilometers but will not be able to orbit.';
    const expectedString = 'Bezos, Blue Origin, is working on a launcher capable of taking passengers beyond the Kármán line, as will SpaceShipTwo, Virgin Galactic\'s ship, which will reach an altitude of 110 kilometers but will not be able to orbit.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('1 should join a text array with correct punctuation', () => {
    const inputString = 'Bezos, Branson and Elon Musk, the founder of PayPal, Tesla Motors and SpaceX, are entrepreneurs of a new age in space.';
    const expectedString = 'Bezos, Branson and Elon Musk, the founder of PayPal, Tesla Motors and SpaceX, are entrepreneurs of a new age in space.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('2 should join a text array with correct punctuation', () => {
    const inputString = 'The objective of SpaceX is not to go beyond the Kármán line but to reduce the cost of space transport and make it possible to colonize Mars.';
    const expectedString = 'The objective of SpaceX is not to go beyond the Kármán line but to reduce the cost of space transport and make it possible to colonize Mars.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('3 should join a text array with correct punctuation', () => {
    const inputString = '"The test flights of our Dragon 2 spacecraft will take place this year, " Musk said in June 2014 at the launch of Tesla\'s new electric car model.';
    const expectedString = '"The test flights of our Dragon 2 spacecraft will take place this year," Musk said in June 2014 at the launch of Tesla\'s new electric car model.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('4 should join a text array with correct punctuation', () => {
    const inputString = '"We\'ll be on Mars in 10 or 11 years. »';
    const expectedString = '"We\'ll be on Mars in 10 or 11 years. »';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('5 should join a text array with correct punctuation', () => {
    const inputString = 'The race for space will not be without difficulty.';
    const expectedString = 'The race for space will not be without difficulty.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('6 should join a text array with correct punctuation', () => {
    const inputString = 'The Bezos company, Blue Origins, has already launched satellites and SpaceX will make several launches for NASA in 2014 to supply the International Space Station, the largest object in orbit, 420 kilometers above the earth\'s surface.';
    const expectedString = 'The Bezos company, Blue Origins, has already launched satellites and SpaceX will make several launches for NASA in 2014 to supply the International Space Station, the largest object in orbit, 420 kilometers above the earth\'s surface.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('7 should join a text array with correct punctuation', () => {
    const inputString = 'Certainly the Moon is 384, 400 kilometers from Earth and we have not been back since December 1972, the date of Apollo 17\'s return, but things are moving on several fronts.';
    const expectedString = 'Certainly the Moon is 384,400 kilometers from Earth and we have not been back since December 1972, the date of Apollo 17\'s return, but things are moving on several fronts.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('8 should join a text array with correct punctuation', () => {
    const inputString = 'The commercial players play their part and NASA, together with the European Space Agency (ESA), with their many partners, are working on space exploration by looking at Mars.';
    const expectedString = 'The commercial players play their part and NASA, together with the European Space Agency (ESA), with their many partners, are working on space exploration by looking at Mars.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('9 should join a text array with correct punctuation', () => {
    const inputString = 'Independent bodies also intervene.';
    const expectedString = 'Independent bodies also intervene.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('10 should join a text array with correct punctuation', () => {
    const inputString = 'Mars One, a Dutch non-profit foundation, has been researching astronauts since 2013.';
    const expectedString = 'Mars One, a Dutch non-profit foundation, has been researching astronauts since 2013.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('11 should join a text array with correct punctuation', () => {
    const inputString = 'Their mission will be to establish a permanent colony on Mars.';
    const expectedString = 'Their mission will be to establish a permanent colony on Mars.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('12 should join a text array with correct punctuation', () => {
    const inputString = 'The first crew will leave in 2024, followed by a second three years later, one year after the first landing on the red planet.';
    const expectedString = 'The first crew will leave in 2024, followed by a second three years later, one year after the first landing on the red planet.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });
});

describe('joinTextArray on segment set 3', () => {
  it('0 should join a text array with correct punctuation', () => {
    const inputString = 'According to Mars One, more than 200, 000 candidates have been registered, an impressive figure considering that it will be a trip without a return ticket.';
    const expectedString = 'According to Mars One, more than 200,000 candidates have been registered, an impressive figure considering that it will be a trip without a return ticket.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('1 should join a text array with correct punctuation', () => {
    const inputString = 'Mars One astronauts will intersect with NASA\'s robotic scientific explorer, to be launched in 2020, in just six years.';
    const expectedString = 'Mars One astronauts will intersect with NASA\'s robotic scientific explorer, to be launched in 2020, in just six years.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('2 should join a text array with correct punctuation', () => {
    const inputString = 'Experts on the board of the American Astronautical Society on Mars agree that human exploration of Mars will be "technologically feasible" from the 2030s on, but much remains to be done.';
    const expectedString = 'Experts on the board of the American Astronautical Society on Mars agree that human exploration of Mars will be "technologically feasible" from the 2030s on, but much remains to be done.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('3 should join a text array with correct punctuation', () => {
    const inputString = 'Virgin Galactic was founded in 2004 and, in July 2008, Branson stated that the first space flight would take place in 18 months.';
    const expectedString = 'Virgin Galactic was founded in 2004 and, in July 2008, Branson stated that the first space flight would take place in 18 months.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('4 should join a text array with correct punctuation', () => {
    const inputString = 'But there has not yet been an inaugural trip.';
    const expectedString = 'But there has not yet been an inaugural trip.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('5 should join a text array with correct punctuation', () => {
    const inputString = '"That has an explanation, " explained George Whitesides, president of Virgin Galactic:';
    const expectedString = '"That has an explanation," explained George Whitesides, president of Virgin Galactic:';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('6 should join a text array with correct punctuation', () => {
    const inputString = '"It\'s hard.';
    const expectedString = '"It\'s hard.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('7 should join a text array with correct punctuation', () => {
    const inputString = 'No one has done it before. "';
    const expectedString = 'No one has done it before."';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('8 should join a text array with correct punctuation', () => {
    const inputString = 'Growing taller and further away';
    const expectedString = 'Growing taller and further away';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('9 should join a text array with correct punctuation', () => {
    const inputString = 'It is difficult to predict whether missions to Mars, or even to nearest destinations, will succeed but the work done also has more immediate results.';
    const expectedString = 'It is difficult to predict whether missions to Mars, or even to nearest destinations, will succeed but the work done also has more immediate results.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('10 should join a text array with correct punctuation', () => {
    const inputString = 'What is being done now will allow us to get to Australia in less time from New York, says Sean Holt, vice president of engineering and technical services at Sandvik Coromant for the aerospace segment.';
    const expectedString = 'What is being done now will allow us to get to Australia in less time from New York, says Sean Holt, vice president of engineering and technical services at Sandvik Coromant for the aerospace segment.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('11 should join a text array with correct punctuation', () => {
    const inputString = '';
    const expectedString = '';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('12 should join a text array with correct punctuation', () => {
    const inputString = '"Despite what Richard Branson says, space travel remains a distant possibility and one of the main reasons is cost, " he says.';
    const expectedString = '"Despite what Richard Branson says, space travel remains a distant possibility and one of the main reasons is cost," he says.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('13 should join a text array with correct punctuation', () => {
    const inputString = 'However, there are advances.';
    const expectedString = 'However, there are advances.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('14 should join a text array with correct punctuation', () => {
    const inputString = '"The distance between what is now being sought with commercial aircraft and what spacecraft do is getting smaller, " he continues.';
    const expectedString = '"The distance between what is now being sought with commercial aircraft and what spacecraft do is getting smaller," he continues.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });
});

describe('joinTextArray on segment set 3', () => {
  it('0 should join a text array with correct punctuation', () => {
    const inputString = 'Bezos company Blue Origin works on a launch system that takes its passengers above the Kármán line.';
    const expectedString = 'Bezos company Blue Origin works on a launch system that takes its passengers above the Kármán line.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('1 should join a text array with correct punctuation', () => {
    const inputString = 'The SpaceShipTwo of Branson\'s company, Virgin Galactic, will also go above the Kármán line, but will not exceed 110 kilometers, without reaching Earth.';
    const expectedString = 'The SpaceShipTwo of Branson\'s company, Virgin Galactic, will also go above the Kármán line, but will not exceed 110 kilometers, without reaching Earth.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('2 should join a text array with correct punctuation', () => {
    const inputString = 'Bezos, Branson and Elon Musk, founder of PayPal, electric car maker Tesla Motors and SpaceX are the entrepreneurs of this new space age.';
    const expectedString = 'Bezos, Branson and Elon Musk, founder of PayPal, electric car maker Tesla Motors and SpaceX are the entrepreneurs of this new space age.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('3 should join a text array with correct punctuation', () => {
    const inputString = 'The aim of Musk\'s SpaceX is not to pass Kármán\'s line but to reduce the costs of space transport and to allow the colonization of Mars.';
    const expectedString = 'The aim of Musk\'s SpaceX is not to pass Kármán\'s line but to reduce the costs of space transport and to allow the colonization of Mars.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('4 should join a text array with correct punctuation', () => {
    const inputString = '"During this year, we will test flights with our Dragon 2, " Musk predicted in June 2014 to launch the new Tesla model.';
    const expectedString = '"During this year, we will test flights with our Dragon 2," Musk predicted in June 2014 to launch the new Tesla model.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('5 should join a text array with correct punctuation', () => {
    const inputString = '"Within 10 or 11 years, we will fly to Mars. "';
    const expectedString = '"Within 10 or 11 years, we will fly to Mars."';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('6 should join a text array with correct punctuation', () => {
    const inputString = 'But the space race is not free of setbacks.';
    const expectedString = 'But the space race is not free of setbacks.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('7 should join a text array with correct punctuation', () => {
    const inputString = 'Blue Origin has already launched satellites and SpaceX has several NASA launches scheduled for 2014 to deliver cargo and supplies to the International Space Station crew.';
    const expectedString = 'Blue Origin has already launched satellites and SpaceX has several NASA launches scheduled for 2014 to deliver cargo and supplies to the International Space Station crew.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('8 should join a text array with correct punctuation', () => {
    const inputString = 'At 420 kilometers in height, it is the largest artificial object in Earth\'s orbit.';
    const expectedString = 'At 420 kilometers in height, it is the largest artificial object in Earth\'s orbit.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('9 should join a text array with correct punctuation', () => {
    const inputString = 'True, we have not returned to the Moon, 384, 400 kilometers from Earth, since December 1972 and Apollo 17, but there is progress.';
    const expectedString = 'True, we have not returned to the Moon, 384,400 kilometers from Earth, since December 1972 and Apollo 17, but there is progress.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('10 should join a text array with correct punctuation', () => {
    const inputString = 'Commercial actors play their part and NASA and the European Space Agency (EEA), together with their many suppliers, are working on space exploration, with the planet Mars as the first destination.';
    const expectedString = 'Commercial actors play their part and NASA and the European Space Agency (EEA), together with their many suppliers, are working on space exploration, with the planet Mars as the first destination.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('11 should join a text array with correct punctuation', () => {
    const inputString = 'Mars One, a Dutch non-profit foundation, started looking for astronauts in 2013.';
    const expectedString = 'Mars One, a Dutch non-profit foundation, started looking for astronauts in 2013.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });
  
  it('12 should join a text array with correct punctuation', () => {
    const inputString = 'Its mission is to establish a permanent human settlement on Mars.';
    const expectedString = 'Its mission is to establish a permanent human settlement on Mars.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });
  
  it('13 should join a text array with correct punctuation', () => {
    const inputString = 'The first crew would set sail for the red planet in 2024 and would follow a second three years later, a year after the first landing.';
    const expectedString = 'The first crew would set sail for the red planet in 2024 and would follow a second three years later, a year after the first landing.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });
  
  it('14 should join a text array with correct punctuation', () => {
    const inputString = 'There are private organizations that are also targeting the project.';
    const expectedString = 'There are private organizations that are also targeting the project.';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('15 should join a text array with correct punctuation', () => {
    const inputString = '';
    const expectedString = '';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });

  it('16 should join a text array with correct punctuation', () => {
    const inputString = 'According to Netflix, its most viewed original series on its platform in the first third of 2018 have been "Altered Carbon," "The End of the F***ing World," "Jessica Jones," "Grace and Frankie," "Santa Clarita Diet" and "A series of catastrophic misfortunes"';
    const expectedString = 'According to Netflix, its most viewed original series on its platform in the first third of 2018 have been "Altered Carbon," "The End of the F***ing World," "Jessica Jones," "Grace and Frankie," "Santa Clarita Diet" and "A series of catastrophic misfortunes"';
    // const tokens = tokenizer(expectedString, (outputArray) => { return outputArray});
    const tokensPromise = buildPromise(inputString);
    return tokensPromise.then((array) => {
      expect(StringParser.joinTextArray(array)).toEqual(expectedString);
    });
  });
});

function buildPromise(input) {
  return new Promise((resolve, reject) => {
    tokenizer(input, resolve);
  });
}
