import repl from 'repl';
import * as typeorm from 'typeorm';
import * as article from './entity/article';
import * as attach from './entity/attach';
import * as category from './entity/category';
import * as post1 from './entity/post1';
import * as post2 from './entity/post2';
import * as post3 from './entity/post3';
import * as post4 from './entity/post4';
import * as user from './entity/user';
import { connect } from './utils';

/**
 * @see https://github.com/kazamori/typeorm-performance-issues-sample/tree/main/src
 * @desc REPL DB Connection Utils
 */

async function preprocess() {
  // initialize database connection
  await connect(true);
}

preprocess();

for (const items of [typeorm, article, attach, category, post1, post2, post3, post4, user]) {
  Object.entries(items).map(([key, value]) => {
    // @ts-ignore
    globalThis[key] = value;
  });
}

const replServer = repl.start();
