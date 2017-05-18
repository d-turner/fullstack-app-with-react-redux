import _ from 'lodash';

// - refactoring - the XLIFF parser should just return an object which provides a javascript interface to the XLIFF DOM
// - the API to the XLIFF DOM should be in the editArea, XLIFF objects should not be global in the app
const xliffParser = (fileReader, $q, $log) => {
  // Persistent DOMParser
  const parser = new DOMParser();

  return {
    readFile(file) {
      const promise = fileReader.readAsText(file);
      // TODO: how to chain these properly?
      return promise.then((result) => {
        console.log(result);
        this.parseXML(result);
      });
    },
    // parse an XLIFF file and return
    parseXML(rawText) {
      // TODO: different code paths for XLIFF 1.2 vs. 2.0 (this is the only way to support both)
      // Working - just return the Document object from this function
      const deferred = $q.defer();
      const self = this;

      // a basic xliff wrapper tag:
      // <xliff xmlns="urn:oasis:names:tc:xliff:document:2.0" version="2.0"

      const xml = parser.parseFromString(rawText, 'text/xml');

      // Parsing error?
      const parserError = xml.querySelector('parsererror');
      if (xml.documentElement.nodeName === 'parsererror') {
        const errorString = new XMLSerializer().serializeToString(parserError);
        $log.error('error while parsing');
        $log.error(errorString);
        deferred.reject(`Error while parsing XLIFF file: ${errorString}`);
      }

      // BEGIN: define the application-internal document object
      const Document = {};
      // Set Document DOM to the parsed result
      Document.DOM = xml;
      // Working - the XLIFF parser returns a Document representation of the XLIFF
      Document.segments = [];
      Document.sourceLang = sourceLang;
      Document.targetLang = targetLang;

      Document.segmentStates = [];

      // END: define the application-internal document object

      const file = xml.querySelector('file');
      const xliffTag = xml.querySelector('xliff');

      // TODO: fork here, depending on xliff version -- we want to support both 2.0 and 1.2 for the time being

      // Read the source and target language - set defaults to English and German
      let sourceLang = file.getAttribute('source-language');
      if (!sourceLang) sourceLang = 'en';
      Document.sourceLang = sourceLang;

      let targetLang = file.getAttribute('target-language');
      if (!targetLang) targetLang = 'de';
      Document.targetLang = targetLang;

      if (sourceLang !== 'en-us') {
        $log.warn(`Source language ${sourceLang} is not supported yet.`);
      }
      if (targetLang !== 'de') {
        $log.warn(`Target language ${targetLang} is not supported yet.`);
      }

      // Working -- segmentation with <seg-source> and <mrk> tags is Optional
      // add support for pure <source> and <target>
      const sourceSegments = this.getTranslatableSegments(xml);

      // for every segment, get its matching target mrk, if it exists - note: it may not exist
      const targetSegments = _.map(sourceSegments, (seg) => {
        if (seg.nodeName === 'mrk') {
          return self.getMrkTarget(xml, seg);
        }
        // there's no mrks inside <target>, just a <target> -- TODO: do we require target nodes to exist?
        return seg.parentNode.querySelector('target');
      });

      // we can assume that translators will want to translate every segment, so there should be at least an
      // empty target node corresponding to each source node
      const sourceWithTarget = _.zip(sourceSegments, targetSegments);
      _.each(sourceWithTarget, (seg) => {
        const sourceText = seg[0].textContent;
        const targetText = seg[1] ? seg[1].textContent : '';
        if (!seg[1]) {
          const mid = seg[0].getAttribute('mid');
          $log.info(`Target segment missing: ${mid}`);
          seg[1] = self.createNewMrkTarget(Document.DOM, seg[0], '', targetLang);
        }

        const segPair = {
          source: seg[0].textContent,
          target: seg[1].textContent,
          sourceDOM: seg[0],
          targetDOM: seg[1],
          // TODO: the segment state should be taken from the XLIFF see XliffTwoParser
          state: 'initial',
        };

        // Add the pairs so we can access both sides from a single ngRepeat
        Document.segments.push(segPair);
      });

      deferred.resolve(Document);
      return deferred.promise;
    },
    // working - the source may not be segmented with <seg-source> tags -- there may only be a single <source> tag
    getTranslatableSegments(xmlDoc) {
      const transUnits = xmlDoc.querySelectorAll('trans-unit');
      let translatableSegments = [];
      _.each(transUnits, (transUnit) => {
        // if seg-source, get <mrk> targets, else, get <target>
        if (transUnit.querySelector('seg-source')) {
          // querySelectorAll returns a node list, so we use Array.prototype.slice.call to make it a normal array
          translatableSegments = translatableSegments.concat(
            Array.prototype.slice.call((transUnit.querySelectorAll('seg-source > mrk[mtype="seg"]'))),
          );
        } else {
          translatableSegments = translatableSegments.concat((transUnit.querySelector('source')));
        }
      });

//      return xmlDoc.querySelectorAll('seg-source > mrk[mtype="seg"]');
      return translatableSegments;
    },

    // note: <trans-units> are required to have the 'id' attribute
    getMrkTarget(xmlDoc, seg) {
      const segid = this.getSegId(seg);
      const tuid = this.getTransUnitId(seg);
      return xmlDoc.querySelector(`trans-unit[id="${tuid}"] > target > mrk[mtype="seg"][mid="${segid}"]`);
    },
    getSegId(seg) {
      return seg.getAttribute('mid');
    },

    getTransUnitId(seg) {
      const transunitNode = seg.parentNode.parentNode;
      return transunitNode.getAttribute('id');
    },
    getTransunit(xmlDoc, tuid) {
      return xmlDoc.querySelector(`trans-unit[id="${tuid}"]`);
    },
    getTarget(doc, seg) {
      const tuid = this.getTransUnitId(seg);
      return doc.querySelector(`trans-unit[id="${tuid}"] > target`);
    },
    // TODO: test these functions
    createNewMrkTarget(xmlDoc, seg, newValue, targetLang) {
      const segid = this.getSegId(seg);
      const tuid = this.getTransUnitId(seg);

      // create new mrk/target node
      const mrkTarget = xmlDoc.createElement('mrk');
      mrkTarget.setAttribute('mid', segid);
      mrkTarget.setAttribute('mtype', 'seg');
      mrkTarget.textContent = newValue;

      let targetNode = this.getTarget(xmlDoc, seg);
      if (!targetNode) {
        // There is no previous translation for this transunit
        // create new target node
        targetNode = xmlDoc.createElement('target');
        targetNode.setAttribute('xml:lang', targetLang);

        // append to specific transunit node
        const transUnit = this.getTransunit(xmlDoc, tuid);
        transUnit.appendChild(targetNode);
      }

      // append  mrk_target to target node
      targetNode.appendChild(mrkTarget);

      return mrkTarget;
    },
    // util to stringify an XML dom (takes a DOM as argument)
    getDOMString(xmlObj) {
      const domString = new XMLSerializer().serializeToString(xmlObj);
      return domString;
    },
  };
};

export default xliffParser;
