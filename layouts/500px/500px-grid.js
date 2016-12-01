/**
 * Calculate flex sizes for a grid layout
 * Calculations from https://github.com/xieranmaya/blog/issues/6 #wowza
 * @param  {array} image_sizes      The sizes of an image: {width, height}
 * @param  {integer} target_height  Target height of each image in the grid
 * @return {array}                  The calculated, named sizes
 */
var calculateSizes = function(image_sizes, target_height){

    if (!image_sizes) {
        image_sizes = {
            600,
            400
        };
    }

    return {
        'flex_grow': image_sizes[0] * 100 / image_sizes[1],
        'flex_basis': image_sizes[0] * target_height / image_sizes[1],
        'aspect_ratio': image_sizes[1] / image_sizes[0] * 100
    };
}
