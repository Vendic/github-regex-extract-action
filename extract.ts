import * as core from '@actions/core'

const run = async (): Promise<void> => {
    try {
        const input_pattern = core.getInput('pattern');
        const pattern_flags = core.getInput('pattern_flags')
        const pattern : RegExp = new RegExp(input_pattern, pattern_flags)
        const input_text = core.getInput('text')
        const matches : any = input_text.match(pattern)

        if (matches === null || matches.length === 0) {
            core.info('No matches found')
            return;
        }
        core.info(`Found ${matches.length} matches`)
        core.setOutput('matches', matches.join('\n'))
    } catch (error) {
        core.setFailed(`Action failed: ${error}`)
    }
}

run()

export default run
