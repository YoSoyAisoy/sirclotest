import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
	state=	{ 	
				cityName:'Select Your City', 
				data:[]
			}

	getData=()=>{
		if(this.refs.City.value !== ''){
			axios.get(`	https://api.openweathermap.org/data/2.5/forecast?
						id=${this.refs.City.value}&
						units=metric&
						appid=271da6b323b05ebaf2b4aaa0f3378f89`)
			.then(ok=>{
				this.setState({ cityName:ok.data.city.name, data: ok.data.list })
			}).catch(error=>{
				console.log(error)
			})
		}
	}
	
	renderAvgSuhu=()=>{
		var totalSuhu = 0;
		if(this.state.data.length > 0){
			this.state.data.forEach(data=>{
				totalSuhu += data.main.temp
			})
		}
		var avgSuhu = (totalSuhu/this.state.data.length)
		if(isNaN(avgSuhu)){
			return '-'
		}
		return avgSuhu.toFixed(2)
	}

	renderAvgDelta=()=>{
		var totalDeltaSuhu = 0;
		if(this.state.data.length > 0){
			this.state.data.forEach(data=>{
				totalDeltaSuhu += data.main.temp_kf
			})
		}
		var avgDeltaSuhu = (totalDeltaSuhu/this.state.data.length)
		if(isNaN(avgDeltaSuhu)){
			return '-'
		}
		return avgDeltaSuhu.toFixed(2);
	}

	createTable = () => {
		var table = [];

		if(this.state.data.length !== 0){
			for(var i=0; i<40; i+=8){
				let child = [];
				var getTanggal = new Date((this.state.data[i].dt)*1000)

				for(let j=0; j<1; j++){
					// API returned only 39 data as of 7.10 12-Oct-18 so an if else statement and count variable is used
					var suhu = 0;
					var deltaSuhu = 0;
					var count = 0

					for(var k=0; k<8; k++){
						if(this.state.data[i+k] !== undefined){
							suhu += this.state.data[i+k].main.temp
							deltaSuhu += this.state.data[i+k].main.temp_kf
							count++
						}
					}	
					child.push(
						<td key={(i+1)*1.1} >{getTanggal.getFullYear()}-{getTanggal.getMonth()}-{getTanggal.getDate()}</td>,
						<td key={(i+1)*1.2}>{(suhu/count).toFixed(2)}C</td>,
						<td key={(i+1)*1.3}>{(deltaSuhu/count).toFixed(2)}C</td>
					)
					count = 0;
				}
				table.push(<tr key={i}>{child}</tr>)
			}
		}
		return table
	}

	render() {
		return (
		<div className="App">
			<h1>Histori Cuaca 5 hari</h1>
			Pilih kota dan klik Go!
			<br></br>
			<br></br>
			Kota :<select ref='City'>
					<option value=''> - - - - -</option>
					<option value='1642911'>Jakarta</option>
					<option value='1880252'>Singapura</option>
					<option value='1609350'>Bangkok</option>
				</select>
			<input type='button' onClick={this.getData} value='GO'/>
			<br></br>
			<br></br>
			<table className='tftable'>
				<thead>
					<tr>
						<th style={{textAlign:"center"}}>{this.state.cityName}</th>
						<th style={{textAlign:"center"}}>Suhu</th>
						<th style={{textAlign:"center"}}>Perbedaan</th>
					</tr>
				</thead>
				<tbody>
					{this.createTable()}
				</tbody>
				<tfoot>
					<tr>
						<th style={{textAlign:"center"}}>Rata-rata</th>
						<th style={{textAlign:"center"}}>{this.renderAvgSuhu()}</th>
						<th style={{textAlign:"center"}}>{this.renderAvgDelta()}</th>
					</tr>
				</tfoot>
			</table>
		</div>
		);
	}
}

export default App;
