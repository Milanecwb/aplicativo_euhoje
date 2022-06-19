import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'
import { View } from 'react-native'
import {Text as Textreact} from 'react-native'

const Charts = ({route})=>{
    const dia = route.params.dia
    const mes = route.params.mes
    const semana = route.params.semana

    const data_dia = [
        {
            //total
            key: 1,
            amount: dia.total==0?'':dia.total,
            svg: { fill: '#7B68EE' },
        },
        {
            //animado
            key: 2,
            amount: dia.Motivado==0?'':dia.Motivado,
            svg: { fill: '#3CB371' }
        },
        {
            //normal
            key: 3,
            amount: dia.normal==0?'':dia.normal,
            svg: { fill: '#DAA520' }
        },
        {
            //desMotivado
            key: 4,
            amount: dia.Desmotivado==0?'':dia.Desmotivado,
            svg: { fill: '#FF6347' }
        }
    ]

    const data_semana = [
        {
            //total
            key: 1,
            amount: semana.total==0?'':semana.total,
            svg: { fill: '#7B68EE' },
        },
        {
            //Motivado
            key: 2,
            amount: semana.Motivado==0?'':semana.Motivado,
            svg: { fill: '#3CB371' }
        },
        {
            //normal
            key: 3,
            amount: semana.normal==0?'':semana.normal,
            svg: { fill: '#DAA520' }
        },
        {
            //Desmotivado
            key: 4,
            amount: semana.Desmotivado==0?'':semana.Desmotivado,
            svg: { fill: '#FF6347' }
        }
    ]

    const data_mes = [
        {
            //total
            key: 1,
            amount: mes.total==0?'':mes.total,
            svg: { fill: '#7B68EE' },
        },
        {
            //Motivado
            key: 2,
            amount: mes.Motivado==0?'':mes.Motivado,
            svg: { fill: '#3CB371' }
        },
        {
            //normal
            key: 3,
            amount: mes.normal==0?'':mes.normal,
            svg: { fill: '#DAA520' }
        },
        {
            //Desmotivado
            key: 4,
            amount: mes.Desmotivado==0?'':mes.Desmotivado,
            svg: { fill: '#FF6347' }
        }
    ]

    const Labels = ({ slices, height, width }) => {
        return slices.map((slice, index) => {
            const { labelCentroid, pieCentroid, data } = slice;
            return (
                <Text
                    key={index}
                    x={pieCentroid[ 0 ]}
                    y={pieCentroid[ 1 ]}
                    fill={'black'}
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={15}
                    stroke={'black'}
                    strokeWidth={0.2}
                >
                    {data.amount}
                </Text>
            )
        })
    }
    return(
        <View style={{flex:1}}>
            <PieChart
                style={{ height: '30%' }}
                valueAccessor={({ item }) => item.amount}
                data={data_dia}
                spacing={0}
                outerRadius={'95%'}
                >
                <Labels/>
                <Text
                key={'dia'}
                x={0}
                y={0}
                fill={'black'}
                textAnchor={'middle'}
                alignmentBaseline={'middle'}
                fontSize={15}
                fontWeight={700}
                >Diário
                </Text>
            </PieChart>
            <PieChart
            style={{ height: '30%' }}
            valueAccessor={({ item }) => item.amount}
            data={data_semana}
            spacing={0}
            outerRadius={'95%'}
            >
            <Labels/>
            <Text
            key={'semana'}
            x={0}
            y={0}
            fill={'black'}
            textAnchor={'middle'}
            alignmentBaseline={'middle'}
            fontSize={15}
            fontWeight={700}
            >Semanal
            </Text>
            </PieChart>
            <PieChart
            style={{ height: '30%' }}
            valueAccessor={({ item }) => item.amount}
            data={data_mes}
            spacing={0}
            outerRadius={'95%'}
            >
            <Labels/>
            <Text
            key={'mes'}
            x={0}
            y={0}
            fill={'black'}
            textAnchor={'middle'}
            alignmentBaseline={'middle'}
            fontSize={15}
            fontWeight={700}
            >Mensal
            </Text>
            </PieChart>
            <View style={{width:'99%',height:'10%',alignItems:'center',justifyContent:'space-around',flexDirection:'row'}}>
                <Textreact style={{fontWeight:'700', color:'#7B68EE'}}>Total</Textreact>
                <Textreact style={{fontWeight:'700', color:'#3CB371'}}>Motivado</Textreact>
                <Textreact style={{fontWeight:'700', color:'#DAA520'}}>Normal</Textreact>
                <Textreact style={{fontWeight:'700', color:'#FF6347'}}>Desmotivado</Textreact>
            </View>
        </View>
    )
}

export default Charts;