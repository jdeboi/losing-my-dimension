import React from 'react';
import { withRouter } from "react-router-dom";
import "../../sketches/Gallery/Gallery.css";

import Sketch from './PanSketch';

// store
import { connect } from 'react-redux';
import { doneLoadingApp, loadingApp } from '../../../store/actions';

// sketches
import MacbookAir from '../../sketches/MacbookAir/MacbookAir';
import JungleGyms from '../../sketches/JungleGyms/JungleGyms';
import HardDrives from '../../sketches/HardDrives/HardDrives';
import Mars from '../../sketches/Mars/Mars';
import WetStreams from '../../sketches/WetStreams/WetStreams';
import Confessional from '../../sketches/Confessional/Confessional';

class Projection extends React.Component {
    // testing with new HD
    constructor(props) {
        super(props);

        this.positions = [
                [5, 5],
                [20, 5],
                [20, 18],
                [16, 33],
                [5, 33],
                [12, 14]
        ];

        this.state = {
            currentSketch: 0,
            isGallery: true,
            cameraIndex: 0
        };
    }


    componentDidMount() {
        this.interval = setInterval(this.changeSketch, 28000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    changeSketch = () => {
        if (this.state.isGallery) {
            let index = (this.state.cameraIndex + 1)%this.positions.length;
            this.setState({ isGallery: false, cameraIndex: index });
        }
        else
            this.setState({ currentSketch: (this.state.currentSketch + 1) % 6, isGallery: true });
    }

    loadingDone = () => {
        this.props.doneLoadingApp();
    }

    renderGallery() {
        const { users, roomCount, ui } = this.props;
        const camP = this.positions[this.state.cameraIndex];
        return (
            <div className="Gallery Sketch" >
                <div id="p5_loading" className="loadingclass" style={{ display: "none" }}></div>
                <Sketch
                    className="p5sketch"
                    users={users}
                    roomCount={roomCount}
                    isClosed={false}
                    loadingDone={this.loadingDone}
                    isMobile={ui.isMobile}
                    cameraPosition={camP}
                />
            </div>
        )

    }

    render() {
        const { addClass, removeClass } = this.props;
        const { isGallery, currentSketch } = this.state;

        if (isGallery)
            return this.renderGallery();
        else if (currentSketch === 0)
            return < MacbookAir />
        else if (currentSketch === 1)
            return < JungleGyms />
        else if (currentSketch === 2)
            return < HardDrives />
        else if (currentSketch === 3)
            return <Mars addClass={addClass} removeClass={removeClass} />
        else if (currentSketch === 4)
            return < WetStreams />
        else if (currentSketch === 5)
            return < Confessional />
        // return < MacbookAir />
    }
}



const mapStateToProps = (state) => {
    return {
        user: state.user,
        ui: state.ui
    }
}

const mapDispatchToProps = () => {
    return {
        loadingApp,
        doneLoadingApp,

    }
}
//

export default withRouter(connect(mapStateToProps, mapDispatchToProps())(Projection));
