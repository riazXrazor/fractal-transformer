const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const config = {
    baseDir: __dirname,
    transformerDir: 'transformers',
};

function augmentedData(data) {
    return _(data);
}

function fractal(data, transformer) {
    let adata = augmentedData(data);
    let response = {};
    if (_.isEmpty(transformer) && !_.isFunction(transformer)) {
        throw ("Invalid Transformer");
    }

    if (fs.existsSync(path.join(config.baseDir, config.transformerDir, transformer + '.js'))) {
        response = fractal(adata.value(), require(path.join(config.baseDir, config.transformerDir, transformer)))
    } else if (_.isFunction(transformer)) {
        return transformer(adata);
    } else if (_.isObject(transformer)) {
        _.each(transformer, function (value, key) {
            if (_.isArray(transformer[key])) {
                response[key] = transformer[key]
            } else {
                response[key] = fractal(adata.value(), transformer[key])
            }
        });
    } else {
        response = adata.get(transformer) || ""
    }
    return response;
}

function transform(data, transformer) {
    if (_.isEmpty(data)) {
        return '';
    }

    if (_.isArray(data)) {
        let newArr = [];
        _.map(data, function (item) {
            newArr.push(fractal(item, transformer))
        });

        return newArr
    } else {
        return fractal(data, transformer)
    }

}

module.exports = function (user_config) {

    if (!_.isEmpty(user_config)) {
        _.merge(config, user_config);
    }
    return transform;
};