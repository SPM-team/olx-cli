const { Command, flags } = require("@oclif/command");
const { OXL } = require("../lib/oxl");

class SetCourseCommand extends Command {
  async run() {
    const { flags, args } = this.parse(SetCourseCommand);
    this.oxl = new OXL(args.courseArchivePath);
    this.log(
      `Setting course attributes: ${Object.keys(flags)
        .map((each) => `${each}="${flags[each]}"`)
        .join(", ")}`
    );
    Object.assign(this.oxl, flags);
    this.oxl.save(flags.out);
    this.oxl.cleanup();
  }

  async catch(error) {
    this.oxl.cleanup();
    throw error;
  }
}

SetCourseCommand.args = [
  {
    name: "courseArchivePath",
    required: true,
    description: "Path to OXL course archive",
  },
];

SetCourseCommand.description = `Set course attributes

Update course attributes of an existing course archive.
`;

SetCourseCommand.examples = [
  '$ oxl-cli set-course archive.gz --name "New Course Name"',
];

SetCourseCommand.flags = {
  out: flags.string({description: "path to output archive" }),
  name: flags.string({ description: "course name" }),
  overview: flags.string({ description: "course overview" }),
  shortDescription: flags.string({ description: "course short description" }),
};

module.exports = SetCourseCommand;
