import { Spectral } from "@stoplight/spectral-core";
import { IRange } from "@stoplight/types/dist/parsers";
import ruleset from "./path-must-match-api-standards.yml";

describe("path-must-match-api-standards", () => {
  let spectral: Spectral;

  beforeEach(() => {
    spectral = setupSpectral(ruleset);
  });

  it("has a correct path", async () => {
    const result = await spectral.run(getTestSpec("/api-linting/api/v1/rules"));
    expect(result).toHaveLength(0);
  });

  it("fails if the version is missing", async () => {
    const result = await spectral.run(getTestSpec("/api-linting/api/rules"));

    expect(result).toHaveLength(1);
    expect(result[0].code).toEqual("path-must-match-api-standards");
    expect(result[0].range).toEqual<IRange>({
      start: { line: 3, character: 33 },
      end: { line: 3, character: 36 },
    });
  });

  const getTestSpec = (path: string) => `
    {
      "paths": {
        "${path}": {}
      }
    }
    `;
});