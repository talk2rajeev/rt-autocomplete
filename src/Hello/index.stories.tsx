import React from "react";
import { storiesOf } from "@storybook/react";
import { Hello } from "./index";

storiesOf("Hello world", module)
    .add("Hello world",
        () => <Hello text="Hello world" />
    )
    .add("Hello world again",
        () => <Hello text="Hello world again" />
    )