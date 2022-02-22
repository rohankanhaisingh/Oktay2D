import { generateUniqueID } from "../essentials/generateUniqueId.js";

export class SVGFilter {
    constructor() {

        this.id = generateUniqueID(18).id;
        this.creationTimestamp = Date.now();
        this.type = "SVGFilter";


        const svg = document.createElement("svg");

        svg.setAttribute("version", "1.1");
        svg.setAttribute("data-id", this.id);
        svg.setAttribute("data-type", "svg-container");

        const defs = document.createElement("defs");

        defs.setAttribute("data-id", this.id);
        defs.setAttribute("data-type", "svg-definitions");

        svg.appendChild(defs);

        this.svg = svg;
        this.defs = defs;

        document.body.appendChild(this.svg);
    }
}

export class GaussianBlur extends SVGFilter {
    /**
     * Creates a gaussian blur filter.
     * @param {number} standardDeviation Standard deviation number.
     */
    constructor(standardDeviation) {

        super();

        this.filterId = generateUniqueID(28).id;
        this.standardDeviation = standardDeviation;

        const filter = document.createElement("filter");

        filter.setAttribute("id", this.filterId);
        filter.setAttribute("data-id", this.filterId);
        filter.setAttribute("x", 0);
        filter.setAttribute("y", 0);

        const gaussianFilter = document.createElement("feGaussianBlur");

        gaussianFilter.setAttribute("in", "SourceGraphic");
        gaussianFilter.setAttribute("stdDeviation", this.standardDeviation);

        filter.appendChild(gaussianFilter);

        this.defs.appendChild(filter);

        this.filter = filter;
        this.gaussianFilter = gaussianFilter;
    }
}