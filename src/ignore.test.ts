import {
  walk,
  skyignore,
  dockerignore,
  skyignorePaths,
  dockerignorePaths
} from './ignore';

test('walk', async () => {
  const paths = await walk('fixture/walk');
  paths.sort();
  const expected = ['src/api/index.js', 'src/index.js', 'src/lindex.js'];
  expect(expected).toEqual(paths);
});

test('skyignore', async () => {
  const paths = await skyignore('fixture/skyignore');
  paths.sort();
  const expected = [
    '.skyignore',
    'included-directory/included-file',
    'included-file'
  ];
  expect(expected).toEqual(paths);
});

test('dockerignore', async () => {
  const paths = await dockerignore('fixture/dockerignore');
  paths.sort();
  const expected = ['.dockerignore', 'src/main.go'];
  expect(expected).toEqual(paths);
});

test('skyignorePaths', async () => {
  const inputPaths = [
    '.skyignore',
    'ignored-directory/my-parent-is-ignored',
    'ignored-file',
    'included-directory/included-file',
    'included-file'
  ];
  const paths = await skyignorePaths(
    inputPaths,
    'fixture/skyignore/.skyignore'
  );
  paths.sort();
  const expected = [
    '.skyignore',
    'included-directory/included-file',
    'included-file'
  ];
  expect(expected).toEqual(paths);
});

test('dockerignorePaths', async () => {
  const inputPaths = [
    '.dockerignore',
    'Dockerfile',
    'ca.crt',
    'ca.key',
    'node_modules/package/index.js',
    'src/main.go'
  ];
  const paths = await dockerignorePaths(
    inputPaths,
    'fixture/dockerignore/.dockerignore'
  );
  paths.sort();
  const expected = ['.dockerignore', 'Dockerfile', 'src/main.go'];
  expect(expected).toEqual(paths);
});
