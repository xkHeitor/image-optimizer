require('dotenv/config');
const sharp = require('sharp');
const fs = require('fs').promises;
const async = require('async')
const readlineSync = require('readline-sync');

const maxFiles = 8e3;

async function start () {
	let standardConfigs = readlineSync.question(`Deseja usar as configuracoes padrao (${process.env.WIDTH} x ${process.env.HEIGHT} - ${process.env.QUALITY}%)? [S/n]:`);
	if (standardConfigs.toUpperCase() == 'N') {
		console.log('Digite as configuracoes desejadas a seguir.')
		let quality = readlineSync.question('Escolha a qualidade da imagem, de 60 a 100, Digite um numero inteiro:');
		let width = readlineSync.question('Largura desejada, Digite um numero inteiro:');
		let height = readlineSync.question('Altura desejada, Digite um numero inteiro:');
		
		if (!isNaN(width) && width > 0) {
			process.env.WIDTH = width;
		}
	
		if (!isNaN(height) && height > 0) {
			process.env.HEIGHT = height;
		}
	
		if (!isNaN(quality) && quality > 59 && quality < 101) {
			process.env.QUALITY = quality;
		}
	}

	let standardFolders = readlineSync.question(`Usar pastas padroes? (${process.env.SRC_FOLDER}, ${process.env.DEST_FOLDER}), [S/n]:`);
	if (standardFolders.toUpperCase() == 'N') {
		process.env.SRC_FOLDER = readlineSync.question(`Substituir a pasta origem por?:`).trim();
		process.env.DEST_FOLDER = readlineSync.question(`Substituir a pasta destino por?:`).trim();
	}

	console.log(`Otimização iniciada com as configuraçãoes: Origem: ${process.env.SRC_FOLDER}, Destino:${process.env.DEST_FOLDER}, (${process.env.WIDTH} x ${process.env.HEIGHT} - ${process.env.QUALITY}%)`);
	compress();
}

const compress = async () => {
	const directory = await fs.readdir(process.env.SRC_FOLDER);
	const pattern = new RegExp('^.*.(jpeg|JPEG|jpg|JPG|gif|GIF|png|PNG|webp|WEBP)$');
	const files = directory.filter(file => pattern.test(file));
  
	if (files.length > 0) {
		files.map(async file => {
		  await addQueue(file);
		});
	}
};

const addQueue = (file) => {
	return new Promise (resolve => {
		if (queue.length() < maxFiles) 
			resolve(queue.push(file));
		else 
			setTimeout( () => { addQueue(file) }, 3e3);
	});
}

const queue = async.queue(async (file) => {		  
	const content = await fs.readFile(`${process.env.SRC_FOLDER}/${file}`);
	const compressContent = await sharp(content)
	  .resize(Number(process.env.WIDTH), Number(process.env.HEIGHT), {
		fit: 'inside',
		withoutEnlargement: true,
	  })
	  .toFormat(process.env.FORMAT, {
		progressive: true,
		quality: parseInt(process.env.QUALITY),
	  })
	  .toBuffer();

	await fs.writeFile(
	  `${process.env.DEST_FOLDER}/${file}`,
	  compressContent
	);
}, maxFiles);

start();