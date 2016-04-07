import fileResolved from './local';
import fileUnresolved from './extra-file';

console.log(localResolved, localUnresolved);

import folderResolved from './folder';
import folderUnresolved from './extra-folder';

console.log(folderResolved, folderUnresolved);

import pkgResolved from 'pkg';
import pkgUnresolved from 'extra-pkg';

console.log(pkgResolved, pkgUnresolved);
