import React from "react";
import Component, { frontMatter } from "./test.md";
import { render } from "@testing-library/react";

describe("jest transformer md", () => {
  test("that frontMatter is correct", () => {
    expect(frontMatter.title).toBe("Jest Transformer MD");
    expect(frontMatter.path).toBe("https://soulpicks.com");
    expect(frontMatter.from).toBe("Batman");
    expect(frontMatter.location).toBe("Amsterdam");
  });
  test("that it still renders in react", () => {
    const { asFragment } = render(<Component />);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <p>
          Every man who has lotted here over the centuries, has looked up to the light and imagined climbing to freedom. So easy, so simple! And like shipwrecked men turning to seawater foregoing uncontrollable thirst, many have died trying. And then here there can be no true despair without hope. So as I terrorize Gotham, I will feed its people hope to poison their souls. I will let them believe that they can survive so that you can watch them climbing over each other to stay in the sun. You can watch me torture an entire city. And then when you've truly understood the depth of your failure, we will fulfill Ra's Al Ghul's destiny. We will destroy Gotham. And then, when that is done, and Gotham is... ashes. Then you have my permission to die.
        </p>
        <h1>
          Heading 1
        </h1>
        <h2>
          Heading 2
        </h2>
        <h3>
          Heading 3
        </h3>
        <h4>
          Heading 4
        </h4>
        <h5>
          Heading 5
        </h5>
        <h6>
          Heading 6
        </h6>
        <p>
          This is a list:
        </p>
        <ul>
          <li>
            List item 1
          </li>
          <li>
            List item 2
          </li>
          <li>
            List item 3
          </li>
        </ul>
      </DocumentFragment>
    `);
  });
});
