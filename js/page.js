var app = angular.module('pages', []);

app.directive('pages', function(){
	return {
		restrict :'A',
		replace:true,
		template:`
			<div class="pages" ng-show="sum_page > 1">
				<span ng-click="goPageFn(page-1)">上一页</span>
				<span ng-repeat="v in left" ng-show="v <= sum_page" ng-class="{nowPage: page == v}" ng-click="goPageFn(v)">{{ v }}</span>
				<span ng-show="middle[0] > left[L_view-1] + 1">...</span>
				<span ng-repeat="v in middle" ng-show="v > left[L_view-1] && v <= sum_page" ng-class="{nowPage: page == v}" ng-click="goPageFn(v)">{{ v }}</span>
				<span ng-show="right[0] > middle[M_view*2] + 1">...</span>
				<span ng-repeat="v in right" ng-show="v > middle[M_view*2]" ng-class="{nowPage: page == v}" ng-click="goPageFn(v)">{{ v }}</span>
				<span ng-click="goPageFn(page+1)">下一页</span> 
				跳到 <input type="number" ng-model="goPage"> 页<button ng-click="goPageFn(goPage/1)">GO</button>
			</div>
		`,
		controller: function($scope, $rootScope){
			
			$scope.goPage = 1;
			$scope.L_view = 1;
			$scope.R_view = 1;
			$scope.M_view = 2;
			
			var newPage = function pages(page, sum_page){
				$scope.page = page;
				$scope.sum_page = sum_page;
				$scope.ch = function(number){
					$scope.newN = ($scope.num*(number-1));
					/*$rootScope a = $scope.newDate.slice((number-1) * $scope.num,$scope.num*number);
					$scope.datalist = a;*/
				}
				$scope.goPageFn = function (page) {
					//console.log(page, sum_page)
					if(page > sum_page) {
						page = sum_page;
					}
					if(page <= 0){
						page = 1
					}
					$scope.ch(page)
                    pages(page, sum_page);
                }
				
				$scope.left = [];
				$scope.middle = [];
				$scope.right = [];
				// 左边数组
				for(var i = 0, l = $scope.L_view; i < l; i++) {
					$scope.left.push(i + 1);
				}

				// 中间数组
				if(page + $scope.M_view + $scope.R_view > sum_page) {
					for(var i = sum_page - $scope.M_view * 2 - $scope.L_view, l = sum_page; i < l; i++) {
						$scope.middle.push(i);
					}
				} else if(page < $scope.M_view + $scope.L_view + 1) {
					for(var i = $scope.L_view + 1, l = $scope.L_view + $scope.M_view * 2 + 2; i < l; i++) {
						$scope.middle.push(i);
					}
				} else {
					for(var i = page - $scope.M_view, l = $scope.M_view + page + 1; i < l; i++) {
						$scope.middle.push(i);
					}
				}

				// 右边数组
				 if (sum_page !== 1) {
                    for (var i = 0, l = $scope.R_view; i < l; i++) {
                        $scope.right.unshift(sum_page - i);
                    }
                }
			}
			 $scope.$emit('pages', newPage);
		}
	}
})
