'use strict';

const  allowedDimension = [ { w: 400,h: 400}, { w: 800, h: 800 } ];

function handler(event) {
    const request = event.request;
    
    console.log(request.querystring)

    // const urlParams = new URLSearchParams(request.querystring);

    if ('d' in request.querystring === false) {
        return request;
    }

    const dimensionMatch = request.querystring.d.value.split('x');

    const width = dimensionMatch[0];
    const height = dimensionMatch[1];

    if (allowedDimension.filter(d => d.w == width && d.h == height).length === 0) {
        return request;
    }

    const parts = request.uri.split('/');
    const filename = parts.pop();

    const url = parts;
    url.push(width + 'x' + height);
    url.push(filename);
    
    request.uri = url.join('/');
    
    return request;
}
