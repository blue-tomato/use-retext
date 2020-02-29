import path from 'path';
import rimraf from 'rimraf';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const dist = 'dist/';
const config = {
  input: path.join('src/index.ts'),
  external: ['react'],
  plugins: [
    resolve({ extensions: ['.ts', '.tsx'] }),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    // babel(),
    terser({ output: { comments: false } }),
  ],
};

rimraf.sync(dist);

export default [
  {
    ...config,
    output: {
      file: path.resolve(pkg.main),
      sourcemap: true,
      format: 'umd',
      name: pkg.name,
      exports: 'named',
      globals: { react: 'React' },
    },
  },
  {
    ...config,
    output: {
      file: path.resolve(pkg.module),
      sourcemap: true,
      format: 'esm',
    },
  },
];
