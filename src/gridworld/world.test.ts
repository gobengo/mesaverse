import { expect, test } from "@jest/globals";
import { GridWorld } from "./gridworld";
import {stripIndent} from 'common-tags'

test('can serialize empty world', () => {
    expect((new GridWorld(1)).toString()).toEqual(stripIndent`
    [
    [" "]
    ]
    `);
    expect((new GridWorld(2)).toString()).toEqual(stripIndent`
    [
    [" "," "],
    [" "," "]
    ]
    `);
});

test('GridWorld#toString() should be parseable as JSON', () => {
    // toString should be parseable as JSON
    expect(() => JSON.parse((new GridWorld(3)).toString())).not.toThrow();
});
