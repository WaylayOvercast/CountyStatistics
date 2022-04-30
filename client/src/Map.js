import React from "react";
import * as d3 from "d3";

export default function Map ({mapData, settings, setSettings, metaData}) {

    let svgRef = React.useRef(null);
    

    React.useEffect(() => {
        
        svgRef = d3.select('#canvas');
        svgRef.selectAll('*').remove();
        svgRef.selectAll('path')
            .data(mapData).enter()
            .append('path')
            .attr('d', d3.geoPath())
            .attr('class', 'county')

        if(settings === 'default') {
            svgRef.selectAll('path')
                .attr('fill', (svgItem) => {
                    let county = metaData.edu.find((item) =>
                        item.fips === svgItem.id
                    )
                    let ratio = county.bachelorsOrHigher
                    
                    switch(true) {
                        case ( ratio < 5 ): 
                            return '#FF5200'
                        case ( ratio < 10 && ratio > 5 ):
                            return '#FF8A00'
                        case ( ratio < 15 && ratio > 10 ):
                            return '#FFB400'
                        case ( ratio < 18 && ratio > 15 ):
                            return '#FFEC00'
                        case ( ratio < 25 && ratio > 18 ):
                            return '#D3FF00'
                        case ( ratio < 30 && ratio > 25 ):
                            return '#9EFF00'
                        case ( ratio < 35 && ratio > 30 ):
                            return '#45FF00'
                        case ( ratio < 40 && ratio > 35 ):
                            return '#00FFB2'
                        case ( ratio < 50 && ratio > 40):
                            return '#00FFC1'
                        case ( ratio > 50 ):
                            return '#00D8FF'
                        default: return "#DFEEFF"
                    }      
                })
                .attr('fips-id', (svgItem) => {
                    return svgItem.id
                })
                .attr('education', (svgItem) => {
                    let county = metaData.edu.find((item) => 
                        item.fips === svgItem.id
                    )
                    let ratio = county.bachelorsOrHigher
                    return ratio
                })

                
        }

        
    },[mapData])

    return (
        <>
            <svg id="canvas">

            </svg>
          
        </>
    )
}
