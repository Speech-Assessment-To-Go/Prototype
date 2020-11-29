import React from 'react';
import { View, Text, Platform  } from 'react-native';


export class RoundedText extends React.Component {
    render() {
        const size = this.props.size;
        const fontSize = this.props.fontSize;
        const borderWidth = 0;
        const backgroundColor = this.props.backgroundColor;

        return (
            <View style = {{
                alignItems:'center',
                justifyContent:'center',
                backgroundColor: backgroundColor,
                borderColor: this.props.color,
                width:size,	height:size,
                borderRadius:size,
                borderWidth:borderWidth,
                marginRight: 20
            }}>
                <Text style = {{
                    textAlign: 'center',
                    backgroundColor:'none',
                    fontSize:fontSize - 2 * borderWidth,
                    fontWeight: 'bold',
                    lineHeight:fontSize - (Platform.OS === 'ios' ? 2 * borderWidth : borderWidth),
                }}>
                    {this.props.title}
                </Text>
            </View>
        );
    }
}