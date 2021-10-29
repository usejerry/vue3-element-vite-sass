<template>
    <div class="dashboard_wrapper">
        <div class="Mychart" id="Mychart">
            <el-card :body-style="{ padding: '0px',height:'500px' }" class="my_li">
                <template #header>
                  <div class="card-header">
                      3D柱体图
                  </div>
                </template>
                 <Cylindrical></Cylindrical>
            </el-card>
            <el-card :body-style="{ padding: '0px',height:'500px' }" class="my_li">
                <template #header>
                  <div class="card-header">
                      3D饼图
                  </div>
                </template>
                 <TDChart :option="optionData1" chartid="PiecChart"></TDChart>
            </el-card>
            <el-card :body-style="{ padding: '0px',height:'500px' }" class="my_li">
                <template #header>
                  <div class="card-header">
                      3D面积图
                  </div>
                </template>
                 <TDChart :option="optionData2" chartid="areChart"></TDChart>
            </el-card>
            <el-card :body-style="{ padding: '0px',height:'500px' }" class="my_li">
                <template #header>
                  <div class="card-header">
                      3D堆叠柱状图
                  </div>
                </template>
                 <TDChart :option="optionData3" chartid="stackChart"></TDChart>
            </el-card>
        </div>
        <div class="tianq">
        </div>
    </div>
</template>

<script setup>
import * as echarts from 'echarts'
import {toRefs,reactive, onMounted} from 'vue'
import { useStore } from 'vuex'
import Cylindrical from '../components/Cylindrical/index.vue'
import TDChart from '../components/TDChart/index.vue'
let optionData1 ={
	credits: {
        enabled: false
    },
	chart: {
			type: 'pie',
			options3d: {
					enabled: true,
					alpha: 45
			}
	},
	title: {
			text: ''
	},
	subtitle: {
			text: ''
	},
	plotOptions: {
			pie: {
					innerSize: 100,
					depth: 45
			}
	},
	series: [{
			name: '货物金额',
			data: [
					['香蕉', 8],
					['猕猴桃', 3],
					['桃子', 1],
					['橘子', 6],
					['苹果', 8],
					['梨', 4],
					['柑橘', 4],
					['橙子', 1],
					['葡萄 (串)', 1]
			]
	}]
}
let optionData2 = {
	credits: {
        enabled: false
    },
	chart: {
		type: 'area',
		options3d: {
			enabled: true,
			alpha: 15,
			beta: 30,
			depth: 200
		}
	},
	title: {
		text: "Visual comparison of Mountains Panorama"
	},
	yAxis: {
		title: {
			text: 'Height Above Sea Level',
			x: -40
		},
		labels: {
			format: '{value:,.0f} MAMSL'
		},
		gridLineDashStyle: 'Dash'
	},
	xAxis: [{
		visible: false
	}, {
		visible: false
	}, {
		visible: false
	}],
	plotOptions: {
		area: {
			depth: 100,
			marker: {
				enabled: false
			},
			states: {
				inactive: {
					enabled: false
				}
			}
		}
	},
	tooltip: {
		valueSuffix: ' MAMSL'
	},
	series: [{
		name: "Tatra Mountains visible from Rusinowa polana",
		lineColor: 'rgb(180,90,50)',
		color: 'rgb(200,110,50)',
		fillColor: 'rgb(200,110,50)',
		data: [
			['Murań', 1890],
			['Nowy Wierch', 2009],
			['Hawrań', 2152],
			['Płaczliwa Skała', 2142],
			['Szalony Wierch', 2061],
			['Karczmarski Wierch', 1438],
			['Jagnięcy Szczyt', 2230],
			['Czerwona Turnia', 2284],
			['Kołowy Szczyt', 2418],
			['Czarny Szczyt', 2429],
			['Baranie Rogi', 2526],
			['Śnieżny Szczyt', 2465],
			['Lodowy Szczyt', 2627],
			['Lodowa Kopa', 2602],
			['Szeroka Jaworzyńska', 2210],
			['Horwacki Wierch', 1902],
			['Spismichałowa Czuba', 2012],
			['Zielona Czuba', 2130],
			['Wielicki Szczyt', 2318],
			['Gerlach', 2655],
			['Batyżowiecki Szczyt', 2448],
			['Kaczy Szczyt', 2395],
			['Zmarzły Szczyt', 2390],
			['Kończysta', 2538],
			['Młynarz', 2170],
			['Ganek', 2462],
			['Wysoka', 2547],
			['Ciężki Szczyt', 2520],
			['Rysy', 2503],
			['Żabi Mnich', 2146],
			['Żabi Koń', 2291],
			['Żabia Turnia Mięguszowiecka', 2335],
			['Wołowa Turnia', 2373]
		]
	}, {
		xAxis: 1,
		lineColor: 'rgb(120,160,180)',
		color: 'rgb(140,180,200)',
		fillColor: 'rgb(140,180,200)',
		name: "Dachstein panorama seen from Krippenstein",
		data: [
			['Kufstein', 2049],
			['Hohe Wildstelle', 2746],
			['Kleiner Miesberg', 2173],
			['Großer Miesberg', 2202],
			['Hochstein', 2543],
			['Lackner Miesberg', 2232],
			['Wasenspitze', 2257],
			['Sinabell', 2349],
			['Feister Scharte', 2198],
			['Eselstein', 2556],
			['Landfriedstein', 2536],
			['Scheichenspitz', 2667],
			['Schmiedstock', 2634],
			['Gamsfeldspitze', 2611],
			['Edelgriess', 2305],
			['Koppenkarstein', 2863],
			['Niederer Gjaidstein', 2483],
			['Hoher Gjaidstein', 2794],
			['Hoher Dachstein', 2995],
			['Niederer Dachstein', 2934],
			['Hohes Kreuz', 2837],
			['Hoher Ochsenkogel', 2513]
		]
	}, {
		xAxis: 2,
		lineColor: 'rgb(200, 190, 140)',
		color: 'rgb(200, 190, 140)',
		fillColor: 'rgb(230, 220, 180)',
		name: "Panorama from Col Des Mines",
		data: [
			['Combin de la Tsessette', 4141],
			['Grand Combin de Grafeneire', 4314],
			['Combin de Corbassière', 3716],
			['Petit Combin', 3672],
			['Pointe de Boveire', 3212],
			['Grand Aget', 3133],
			['Mont Rogneux', 3084],
			['Dents du Grand Lé', 2884],
			['Monts Telliers', 2951],
			['Grand Golliat', 3238],
			['Mont Grande Rochère', 3326],
			['Mont de la Fouly', 2871],
			['Tête de la Payanne', 2452],
			['Pointe Allobrogia', 3172],
			['Six Blanc', 2334],
			['Mont Dolent', 3820],
			['Aiguille de Triolet', 3870],
			['Le Tour Noir', 3836],
			["Aiguille de l'A Neuve", 3753],
			["Aiguille d'Argentière", 3900],
			["Aiguille du Chardonnet", 3824],
			["Aiguille du Tour", 3540],
			["Aiguille du Pissoir", 3440],
			["Le Catogne", 2598],
			["Pointe de Prosom", 2762],
			["Pointe Ronde", 2700],
			["Mont Buet", 3096],
			["Le Cheval Blanc", 2831],
			["Pointe de la Finive", 2838],
			["Pic de Tenneverge", 2985],
			["Pointe d'Aboillon", 2819],
			["Tour Sallière", 3220],
			["Le Dôme", 3138],
			["Haute Cime", 3257],
			["Pierre Avoi", 2473],
			["Cime de l'Est", 3178]
		]
	}]
}
	
let optionData3 ={
    	credits: {
        enabled: false
    },
		chart: {
				type: 'column',
				options3d: {
						enabled: true,
						alpha: 15,
						beta: 15,
						viewDistance: 25,
						depth: 40
				},
				marginTop: 80,
				marginRight: 40
		},
		title: {
				text: ''
		},
		xAxis: {
				categories: ['苹果', '橘子', '梨', '葡萄', '香蕉']
		},
		yAxis: {
				allowDecimals: false,
				min: 0,
				title: {
						text: '水果数量'
				}
		},
		tooltip: {
				headerFormat: '<b>{point.key}</b><br>',
				pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
		},
		plotOptions: {
				column: {
						stacking: 'normal',
						depth: 40
				}
		},
		series: [{
				name: '小张',
				data: [5, 3, 4, 7, 2],
				stack: 'male'
		}, {
				name: '小王',
				data: [3, 4, 4, 2, 5],
				stack: 'male'
		}, {
				name: '小彭',
				data: [2, 5, 6, 2, 1],
				stack: 'female'
		}, {
				name: '小潘',
				data: [3, 0, 4, 4, 3],
				stack: 'female'
		}]
}
</script>

<style lang="scss" scoped>
.dashboard_wrapper{
    width: 100%;
    height: 100%;
    overflow: auto;
    .Mychart{
        width: 100%;
        height: auto;
        overflow: hidden;
        padding: 20px;
        box-sizing: border-box;
        .my_li{
            width: 500px;
            float: left;
            margin-right: 20px;
            margin-bottom: 20px;
        }
    }
}
</style>
