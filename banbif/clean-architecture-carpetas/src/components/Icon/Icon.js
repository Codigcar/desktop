import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default class Icon extends Component {

    static ANT_DESIGN = 'antdesign';
    static ENTYPO = 'entypo';
    static EVIL_ICONS = 'evilicons';
    static FONT_AWESOME = 'fontawesome';
    static FONT_AWESOME_5 = 'fontawesome5'
    static FONT_AWESOME_5_PRO = 'fontawesome5pro'
    static FOUNDATION = "foundation";
    static IONICONS = 'ionicons';
    static MATERIAL_ICONS = 'materialicons'
    static MATERIAL_COMMUNITY_ICONS = 'materialcommunityicons';
    static OCTICONS = 'octicons';
    static ZOCIAL = 'zocial';
    static SIMPLE_LINE_ICONS = 'simplelineicons';

    render() {
        switch (this.props.family) {
            case Icon.ANT_DESIGN:
                return <AntDesign {...this.props} />;
            case Icon.ENTYPO:
                return <Entypo {...this.props} />;
            case Icon.EVIL_ICONS:
                return <EvilIcons {...this.props} />;
            case Icon.FONT_AWESOME:
                return <FontAwesome {...this.props} />;
            case Icon.FONT_AWESOME_5:
                return <FontAwesome5 {...this.props} />;
            case Icon.FONT_AWESOME_5_PRO:
                return <FontAwesome5Pro {...this.props} />
            case Icon.FOUNDATION:
                return <Foundation {...this.props} />
            case Icon.IONICONS:
                return <Ionicons {...this.props} />;
            case Icon.MATERIAL_ICONS:
                return <MaterialIcons {...this.props} />;
            case Icon.MATERIAL_COMMUNITY_ICONS:
                return <MaterialCommunityIcons {...this.props} />;
            // case Icon.OCTICONS:
            //     return <Octicons {...this.props} />;
            case Icon.ZOCIAL:
                return <Zocial />;
            case Icon.SIMPLE_LINE_ICONS:
                return <SimpleLineIcons {...this.props} />;
        }
    }
}

Icon.propTypes = {
    family: PropTypes.string
};

Icon.defaultProps = {
    family: Icon.FONT_AWESOME
};