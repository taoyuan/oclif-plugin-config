# oclif-plugin-config

The `oclif-plugin-config` is a command line utility plugin for managing configuration files with oclif. In this plugin,
commands are prefixed with a host application name placeholder, indicating that all config commands are subcommands of
the host main command.

## Installation

You can install `oclif-plugin-config` using npm or yarn:

```bash
$ npm install oclif-plugin-config
```

```bash
$ yarn add oclif-plugin-config
```

## Testing

`oclif-plugin-config` uses Jest for testing. To run tests, use the following command:

```bash
$ npm test
```

```bash
$ yarn test
```

All commands inherit from the `BaseConfigCommand`, which includes the following flags:

- `--project`: Specifies the project name.
- `--name`: Specifies the config file name.
- `--cwd`: Specifies the config file location.
- `--quiet`: Enables quiet mode.

These flags are supported by all commands in the CLI.

## Commands

### clear

This command clears all configurations. Use this command when you want to reset your configurations to default state.
When the command is run, a confirmation prompt is presented to the user to prevent accidental deletions.

Example:

```bash
$ <host-app> config clear
Are you sure to clear all configs? (y/n): y
Configuration has been cleared
```

### del

This command deletes a specific configuration key. Provide the key as an argument to the command.

Example:

```bash
$ <host-app> config del key1
Configuration "key1" deleted
```

### get

This command retrieves the value of a specific configuration key. If no key is provided, it will list all the keys and
their respective values.

Example:

```bash
$ <host-app> config get key1
value1
```

```bash
$ <host-app> config get
➤ config from /path/to/conf
key1: value1
key2: value2
```

### list

This command lists all configuration keys and their respective values.

Example:

```bash
$ <host-app> config list
➤ config from /path/to/conf
key1: value1
key2: value2
```

### set

This command sets a value for a specific configuration key. Provide the key and value as arguments to the command. If a
value is not provided, you'll be prompted to enter one.

Example:

```bash
$ <host-app> config set key1 value1
Configuration "key1" has been added
```

```bash
$ <host-app> config set key1
Enter value for key1 (blank to ignore): value1
Configuration "key1" has been updated
```

## Contributions

Contributions are welcome! Feel free to submit a pull request.

## License

`oclif-plugin-config` is released under the MIT License.
