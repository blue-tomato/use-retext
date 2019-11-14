import babel from 'rollup-plugin-babel';

const isProduction = process.env.NODE_ENV === 'production';

export default (async() => ({
  input: './index.js',
  output: {
      file: './build/bundle.min.js',
      format: 'umd',
      name: 'bundle'
  },
  plugins: [
    isProduction && (await import('rollup-plugin-terser')).terser(),
    babel({
        exclude: 'node_modules/**',
        babelrc: false,
        presets: ["@babel/env"]
    })
  ]
}))()
