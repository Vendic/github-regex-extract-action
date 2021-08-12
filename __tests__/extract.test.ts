import * as core from '@actions/core'
import run from '../extract'
import path from "path";
import * as fs from "fs";

describe('Test happy path', () => {
    it('Extracts matches from the text', async () => {
        // Mocks
        const setOutputMock = jest.spyOn(core, 'setOutput')
        const setInfoMock = jest.spyOn(core, 'info')
        await run()

        // Assertions
        expect(setInfoMock).toHaveBeenCalledWith('Found 2 matches')
        expect(setOutputMock).toHaveBeenCalledWith('matches', 'DEF-123\nABC-123')
    })
})


beforeEach(() => {
    jest.resetModules()
    process.env['INPUT_PATTERN_FLAGS'] = 'gm'
    process.env['INPUT_PATTERN'] = '[A-Z]{2,5}-[0-9]{1,4}'
    const bodyPath = path.join(__dirname, 'text.txt');
    process.env['INPUT_TEXT'] = fs.readFileSync(bodyPath, 'utf8')
})
afterEach(() => {
    delete process.env['INPUT_PATTERN']
    delete process.env['INPUT_TEXT']
})
