const tf = require('@tensorflow/tfjs-node');
const path = require('path')

async function loadModel() {
  try {
    const modelPath = `file://${path.join(__dirname, './my_model_tfjs/model.json')}`;
    const model = await tf.loadGraphModel(modelPath);
    console.log('Model loaded successfully');
  } catch (err) {
    console.error('Error loading the model:', err);
  }
}

loadModel();
