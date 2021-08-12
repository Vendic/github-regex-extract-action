import * as core from '@actions/core'
import run from '../extract'
import path from "path";
import * as fs from "fs";

describe('Test happy path', () => {
    it('Extracts matches from the text', async () => {
        // Mocks
        const bodyPath = path.join(__dirname, 'text.txt');
        process.env['INPUT_TEXT'] = fs.readFileSync(bodyPath, 'utf8')
        const setOutputMock = jest.spyOn(core, 'setOutput')
        const setInfoMock = jest.spyOn(core, 'info')

        await run()

        // Assertions
        expect(setInfoMock).toHaveBeenCalledWith('Found 2 matches')
        expect(setOutputMock).toHaveBeenCalledWith('matches', 'DEF-123\nABC-123')
    })
})

describe('Test fail', () => {
    it('Extracts no matches from the text', async () => {
        // Mocks
        process.env['INPUT_TEXT'] = 'empty'
        const setOutputMock = jest.spyOn(core, 'setOutput')
        const setInfoMock = jest.spyOn(core, 'info')

        await run()

        // Assertions
        expect(setInfoMock).toHaveBeenCalledWith('No matches found')
        expect(setOutputMock).toHaveBeenCalledTimes(0)
    })
})


beforeEach(() => {
    jest.resetModules()
    process.env['INPUT_PATTERN_FLAGS'] = 'gm'
    process.env['INPUT_PATTERN'] = '[A-Z]{2,5}-[0-9]{1,4}'
})
afterEach(() => {
    delete process.env['INPUT_PATTERN']
    delete process.env['INPUT_TEXT']
    delete process.env['INPUT_PATTERN_FLAGS']
})
