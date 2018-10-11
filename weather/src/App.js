	import React, { Component } from 'react';
	import axios from 'axios';
	import './App.css';
	// &appid=271da6b323b05ebaf2b4aaa0f3378f89
	class App extends Component {
	state={cityName:'Select Your City', data:[], dataTanggal:[], dataTemp:[], dataDelta:[], dataTabel:[]}

	getData=()=>{
		if(this.refs.City.value!==''){
			axios.get(`https://api.openweathermap.org/data/2.5/forecast?id=${this.refs.City.value}&units=metric&appid=271da6b323b05ebaf2b4aaa0f3378f89`)
			.then(ok=>{
				this.setState({cityName:ok.data.city.name, data: ok.data.list})
				console.log(this.state.data)
			})
		}
		// if(this.state.data !== []){
		// 	console.log('masuk')
		// 	this.state.data.map(data=>{
		// 		console.log(data)
		// 	})
		// }
		
	}

	renderAvgTemp=()=>{
		var totalTemp = 0;
		if(this.state.data.length > 0){
			this.state.data.map(data=>{
				totalTemp += data.main.temp
			})
		}
		var rerataTemp = (totalTemp/this.state.data.length)
		return rerataTemp.toFixed(2)
	}

	renderAvgDiff=()=>{
		var totalDeltaTemp = 0;
		if(this.state.data.length > 0){
			this.state.data.map(data=>{
				totalDeltaTemp += data.main.temp_kf
			})
		}
		var rerataDeltaTemp = (totalDeltaTemp/this.state.data.length)
		return rerataDeltaTemp.toFixed(2);
	}

	// isiArrayTabel = () => {
	// 	console.log('terpanggil')
	// 	var dataTabel = []
	// 	if(this.state.data.length !== 0){
	// 		for(var i=0; i<40; i+=8){
	// 			var getTanggal = new Date((this.state.data.list[i].dt)*1000)
	// 			this.setState({
	// 				dataTanggal:`${getTanggal.getFullYear()}-${getTanggal.getMonth()}-${getTanggal.getDate()}`,
	// 				dataTemp:this.state.data.list[i].main.temp,
	// 				dataDelta: this.state.data.list[i].main.temp_kf
	// 			})
	// 			if(i==0){
	// 				setTimeout(this.setState({
	// 					dataTabel:
	// 						[
	// 							this.state.dataTanggal, 
	// 							this.state.dataTemp, 
	// 							this.state.dataDelta
	// 						]
	// 				}),300)
	// 			}
	// 			setTimeout(this.setState({
	// 				dataTabel:
	// 					[...dataTabel, 
	// 						[
	// 							this.state.dataTanggal, 
	// 							this.state.dataTemp, 
	// 							this.state.dataDelta
	// 						]
	// 					]
	// 				}), 300)
				
				// var tanggal = []
				// var suhu = []
				// var deltaSuhu = []
				// var dataHarian = []
				// this.setState({dataTabel: [...dataTabel, `${getTanggal.getFullYear()}-${getTanggal.getMonth()}-${getTanggal.getDate()}`,]})
				// dataHarian.push(`${getTanggal.getFullYear()}-${getTanggal.getMonth()}-${getTanggal.getDate()}`)
				// dataHarian.push(this.state.data.list[i].main.temp)
				// dataHarian.push(this.state.data.list[i].main.temp_kf)
				// console.log(dataHarian)
				// dataTabel.push(dataHarian)
				// console.log(dataTabel)
	// 		}
	// 		if(this.state.dataTabel.length>0){
	// 			return this.state.dataTabel.map(data=>{
					
	// 			})
	// 		}
	// 	}
	// }
	// 	renderTanggal=()=>{
	// 		return
	// 	}
	// 		return(
	// 			<tr>
	// 				<td style={{textAlign:"center"}}>{tanggal.getFullYear()}-{tanggal.getMonth()}-{tanggal.getDate()}</td>
	// 				{/* <td style={{textAlign:"center"}}>{this.state.data.list[i].dt_txt.slice(0, 10)}</td> */}
	// 				<td style={{textAlign:"center"}}>{this.state.data.list[i].main.temp}C</td>
	// 				<td style={{textAlign:"center"}}>{this.state.data.list[i].main.temp_kf}C</td>
	// 			</tr>
	// 		)
	// 	}	
	//   }

	createTable = () => {
		var table = [];

		if(this.state.data.length !== 0){
			for(var i=0; i<40; i+=8){
				let child = [];
				console.log(i)
				var getTanggal = new Date((this.state.data[i].dt)*1000)
				for(let j=0; j<1; j++){
					child.push(
						<td>{getTanggal.getFullYear()}-{getTanggal.getMonth()}-{getTanggal.getDate()}</td>,
						<td>{this.state.data[i].main.temp}C</td>,
						<td>{this.state.data[i].main.temp_kf}C</td>
					)
				}
				table.push(<tr>{child}</tr>)
			}
		}
		return table
	}

	render() {
		return (
		<div className="App">
			<h1>Histori Cuaca 5 hari</h1>
			City :<select ref='City'>
					<option value=''> - - - - -</option>
					<option value='1642911'>Jakarta</option>
					<option value='1880252'>Singapura</option>
					<option value='1609350'>Bangkok</option>
				</select>
			<input type='button' onClick={this.getData} value='GO'/>
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
					<th style={{textAlign:"center"}}>Rata-rata</th>
					<th style={{textAlign:"center"}}>{this.renderAvgTemp()}</th>
					<th style={{textAlign:"center"}}>{this.renderAvgDiff()}</th>
				</tfoot>
			</table>
		</div>
		);
	}
	}

	export default App;
