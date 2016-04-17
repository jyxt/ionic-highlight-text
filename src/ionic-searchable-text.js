angular.module("searchable-text", [])
.directive('searchableText', ['$timeout', '$ionicScrollDelegate', function($timeout, $ionicScrollDelegate) {
    return {
        scope: {
            original: '@text',
            showInput: '=',
            input: "=",
            next: '&'
        },
        template: [
            '<div class="bar bar-header item-input-inset" ng-show="showInput">',
            '<button class="button button-clear"  style="position: absolute; top: 5px; right: 100px; " ng-click="clear()">&#x2715;</button>',
            '<label class="item-input-wrapper" style="position: relative;">',
            '<i class="icon ion-ios-search placeholder-icon"></i>',
            '<input type="search" placeholder="Search" ng-model="input" id="input-search">',
            '<p style=" position: absolute; display: inline; right: 39px; top: 7px; color: #b2b2b2; ">{{ result }}</p>',
            '</label>',
            '<div><button class="button button-clear button-search-nav" ng-click="previous()" style="margin-left:5px">Prev</button><button class="button button-clear button-search-nav" ng-click="next()">Next</button></div>',
            '</div>',
            '<div ng-bind-html="text | to_trusted" class="book-text"  id="content"></div>',
        ].join(''),
        link: function(scope, element, attr){

            var original  = scope.original;
            scope.text = original;

            var clear = function(){
                scope.input = '';
            }

            scope.clear = clear
            scope.$watch('showInput', function(){
                clear()
            }, true)


            var scrollToFocus = function () {
                var container = $('#content'),
                    scrollTo = $('.searchable-text-focus');
                container.animate({
                    scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop() - 88
                });
            }

            var updateResult = function (text) {
                scope.result = text
            }


            var makeNav = function (counter, isNext) {
                return function(){
                    if(!scope.input) return
                    $('.searchable-text-found').removeClass('searchable-text-focus')
                    console.log('counter', 'isNext=', isNext, counter)
                    if (isNext) {
                        if(counter.current < counter.total - 1){
                          counter.current ++;
                        }else{
                          counter.current = 0;
                        }
                    }else{
                        counter.current > 0 ? counter.current-- : counter.current = counter.total-1;
                    }
                    $('.searchable-text-found').eq(counter.current).addClass('searchable-text-focus');
                    scrollToFocus()
                    updateResult((counter.current+1) + ' of ' + counter.total)
                }
            }

            scope.$watch('input', function(newVal, oldVal){

                if (newVal === oldVal) return
                if (newVal.length < 1){
                    scope.text = original
                    updateResult("")
                    return
                }

                var re = new RegExp('('+newVal+')', 'gi')

                if (re.test(original)){
                    scope.text = original;
                    scope.text = scope.text.replace(re, "<span class='searchable-text-found'>$1</span>")
                    $timeout(function () {
                        $('.searchable-text-found').eq(0).addClass('searchable-text-focus')
                        var counter = {
                            current: 0,
                            total:  $('.searchable-text-found').length
                        }
                        scope.next = makeNav(counter, true)
                        scope.previous = makeNav(counter, false)
                        updateResult("1 of " + counter.total)
                        scrollToFocus()
                    }, 10);
                }else{
                    scope.text = original
                    updateResult("No match")
                }

            })
        }
    };
}])
.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);
