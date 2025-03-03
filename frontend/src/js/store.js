// $(function() {
//     const quiz = {
//         state: {
//             currentQuest: 0,
//             totalQuest: 0,
//             json: "",
//             cardClassName: "",
//             answers: []
//         },
//         create: {
//             staticItems: {
//                 createBaseItem(json, name, base) {
//                     // return string value for base template tag
//                     if(base) {
//                         return json.base[name]
//                     }
//                     else {
//                         return json.fin[name]
//                     }
//                 },
//                 createSomeBlocks(json, name, base) {
//                     let sub = ``;
//                     if(base) {
//                         json.base[name].forEach(function(item) {
//                             sub += item;
//                         })
//                     }
//                     else {
//                         json.fin[name].forEach(function(item) {
//                             sub += item;
//                         })
//                     }
//                     console.log(sub)
//                     return sub
//                 }
//             },
//             dinamicItems: {
//                 createCards(index, json) {
//                     quiz.utility.prepareList(index, json);
//                     // this function have to return template string with all choices on quiz-page
//                     let items = ``;
//                     if(quiz.checks.checkRowType(index, json, 'item') == 'quiz-content__variants-item--regular-card') {
//                         for (let i = 0; i < json.dinamic[index].cardData.cardInfo.length; i++) {
//                             items += `
//                                     <li class="quiz-content__variants-item ${quiz.checks.checkRowType(index, json, 'item')}">
//                                         <div class="quiz-content__variant-img">
//                                             <img src="${json.dinamic[index].cardData.cardInfo[i][1]}" alt="">     
//                                         </div>
//                                         <h3 class="quiz-content__variant-title">${json.dinamic[index].cardData.cardInfo[i][0]}</h3>
//                                     </li>  
//                             `
//                         }
//                     }
//                     else if(quiz.checks.checkRowType(index, json, 'item') == 'quiz-content__variants-item--linear-card') {
//                         for (let i = 0; i < json.dinamic[index].cardData.cardInfo.length; i++) {
//                             items += `
//                                     <li class="quiz-content__variants-item ${quiz.checks.checkRowType(index, json, 'item')}">
//                                         <h3 class="quiz-content__variant-title">${json.dinamic[index].cardData.cardInfo[i][0]}</h3>
//                                     </li>  
//                             `
//                         }
//                     }
//                     $('.quiz-content__variants-list').html(items);
//                 },
//                 createQuestTitle(index) {
//                     let res = quiz.state.json.dinamic[index].cardData['titleQuestion']
//                     $('.quiz-content__title-question').text(res)
//                 },
//                 createAboutText(index) {
//                     let res = ``;
//                     quiz.state.json.dinamic[index].personData['aboutText'].forEach(el => {
//                         res += el;
//                     });
//                     $('.quiz-content__about').html(res)
//                 },
//                 createCurrentNumber(index) {
//                     let res = index + 1
//                     $('[data-quiz-current]').text(res)
//                 },
//                 createCheckbox(parentClassName) {
//                     $('.' + parentClassName).append(`<input type="checkbox" class="quiz-content__variant-checkbox">`)
//                 }
//             }
//         },
//         checks: {
//             checkRowType(index, json, elem) {
//                 if (elem == "list") {
//                     switch(json.dinamic[index].cardSettings.rowType) {
//                         case 2:
//                             return 'quiz-content__variants-list--regular-list'
//                         case 'linear':
//                             return 'quiz-content__variants-list--linear-list'
//                         default:
//                             console.error('error case')
//                     }
//                 }
//                 else if (elem == "item") {
//                     switch(json.dinamic[index].cardSettings.rowType) {
//                         case 2:
//                             quiz.state.cardClassName = 'quiz-content__variants-item--regular-card'
//                             return 'quiz-content__variants-item--regular-card'
//                         case 'linear':
//                             quiz.state.cardClassName = 'quiz-content__variants-item--linear-card'
//                             return 'quiz-content__variants-item--linear-card'
//                         default:
//                             console.error('error case')
//                     }
//                 }
//             },
//             checkAmountQuests(json) {
//                 quiz.state.totalQuest = json.dinamic.length;
//                 return json.dinamic.length
//             },
//             checkCurrentQuest() {
//                 return quiz.state.currentQuest
//             },
//             checkProgress() {
//                 let amount = quiz.state.totalQuest;
//                 let current = quiz.state.currentQuest;
//                 let progress = (current * (100 / amount))
//                 $('[data-quiz-progress]').css('width', progress + '%')
//                 return progress;
//             }
//         },
//         baseRender(json) {
//             let progress = this.checks.checkProgress();
//             if(progress != 100) {
//                 // function getBaseTemplate will return completed base template
//                 let templ = getBaseTemplate(json);
//                 $('#quiz').html(templ);
//                 this.checks.checkAmountQuests(json);
//                 // binding static btns for events
//                 this.actions.binds.bindBtnNext($('[data-quiz-next]'));
//                 this.actions.binds.bindBtnBack($('[data-quiz-back]'));
//                 this.actions.binds.bindBtnClose($('[data-quiz-close]'));
//                 this.checks.checkProgress()
//             }
//             else {
//                 // function getFinTemplate will return completed base fin-template
//                 let templ = getFinTemplate(json);
//                 $('#quiz').html(templ);
//                 // binding static btns for events
//                 this.actions.binds.bindBtnSend($('[data-quiz-send]'));
//                 this.actions.binds.bindBtnClose($('[data-quiz-close]'));
//                 this.checks.checkProgress()
//             }
//         },
//         dinamicRender() {
//             quiz.create.dinamicItems.createAboutText(quiz.state.currentQuest);
//             quiz.create.dinamicItems.createCards(quiz.state.currentQuest, quiz.state.json);
//             quiz.create.dinamicItems.createCurrentNumber(quiz.state.currentQuest);
//             quiz.create.dinamicItems.createQuestTitle(quiz.state.currentQuest);
//             // binding dinamic cards for event
//             this.actions.binds.bindCard(this.state.cardClassName);
//         },
//         update() {
//             let progress = this.checks.checkProgress();
//             if(progress != 100) {
//                 this.dinamicRender();
//             }
//             else {
//                 this.baseRender(quiz.state.json);
//             }
//         },
//         actions: {
//             binds: {
//                 bindBtnNext(selector) {
//                     selector.click(function() {
//                         quiz.state.currentQuest++;
//                         quiz.utility.setAnswers();
//                         quiz.update();
//                         quiz.utility.hideBtn('quiz-content__btn')
//                     })
//                 },
//                 bindBtnBack(selector) {
//                     selector.click(function() {
//                         if(quiz.state.currentQuest > 0) {
//                             quiz.state.currentQuest--;
//                             quiz.state.answers.pop()
//                             quiz.update();
//                             quiz.utility.hideBtn('quiz-content__btn')
//                         }
//                     })
//                 },
//                 bindBtnSend(selector) {
//                     selector.click(function(e) {
//                         e.preventDefault();
//                         quiz.send();
//                     })
//                 },
//                 bindBtnClose(selector) {
//                     selector.click(function(e) {
//                         quiz.remove();
//                     })
//                 },
//                 bindCard(className) {
//                     // multiselect == false
//                     if (!quiz.state.json.dinamic[quiz.state.currentQuest].cardSettings.multiSelect) {
//                         $('.' + className).click(function () {
//                             $('.' + className).removeClass(className + '_active')
//                             $(this).addClass(className + '_active')
//                             quiz.utility.showBtn('quiz-content__btn')
//                         })
//                     }
//                     // multiselect == true!
//                     else {
//                         // append on card checkbox
//                         quiz.create.dinamicItems.createCheckbox(className);
//                         $('.' + className).click(function () {
//                             $(this).toggleClass(className + '_active')
//                             if($(this).children('input').prop('checked')) {
//                                 $(this).children('input').prop('checked', false)
//                             }
//                             else {
//                                 $(this).children('input').prop('checked', true)
//                             }    
//                             quiz.utility.showBtn('quiz-content__btn')
//                         })
//                     }
//                 }
//             },
//         },
//         utility: {
//             showBtn(className) {
//                 $('.' + className).addClass(className + '_active');
//             },
//             hideBtn(className) {
//                 $('.' + className).removeClass(className + '_active');
//             },
//             setAnswers() {
//                 let res = [];
//                 let titles = $('.quiz-content__title-question').text();
//                 let children = $('.' + quiz.state.cardClassName + '_active').children('.quiz-content__variant-title');
//                 let answ = [];
//                 children.each(function(i, elem) {
//                     answ.push($(elem).text());
//                 })
//                 res.push(titles, answ);
//                 quiz.state.answers.push(res);
//             },
//             prepareList(index, json) {
//                 let list = $('[data-quiz-list]')
//                 list.removeClass();
//                 list.addClass('quiz-content__variants-list').addClass(quiz.checks.checkRowType(index, json, "list"))
//             }
//         },
//         send() {
//             $.ajax({
//                 complete: function() {
//                     console.log('ajax complete');
//                     console.log(quiz.state.answers);
//                     $('[data-quiz-form]').fadeOut()
//                     setTimeout(function() {
//                         $('[data-quiz-text-container]').append(`<h2 class="quiz-content__contacts-title">
//                                                                     Спасибо, что оставили данные
//                                                                 </h2>
//                                                                 <p class="quiz-content__contacts-subtitle">
//                                                                     Наши специалисты свяжутся с вами как можно скорее
//                                                                 </p>`)
//                     }, 500).fadeIn()
//                 }
//              });
//         },
//         init(json) {
//             $('body').addClass('quiz-noscroll')
//             this.state.totalQuest = json.dinamic.length;
//             this.state.json = json;
//             this.baseRender(json);
//             this.dinamicRender();
//         },
//         remove() {
//             $('body').removeClass('quiz-noscroll')
//             $('#quiz').html('')
//         }
//     }
    
//     function getBaseTemplate(json) {
//         return `
//             <div class="quiz-wrapper" data-quiz-wrapper>
//                     <span class="quiz-shadow"></span>
//                 <div class="quiz">
//                     <div class="quiz-container">
//                         <div class="quiz-content">
//                             <h1 class="quiz-content__title-know">
//                                 ${quiz.create.staticItems.createBaseItem(json, 'titleKnow', true)}
//                             </h1>
//                             <button class="quiz-content__btn-close" data-quiz-close>
//                                 <span></span>
//                                 <span></span>
//                             </button>
//                             <div class="quiz-content__card">
//                                 <div class="quiz-content__card-side quiz-content__card-side--left">
//                                     <h1 class="quiz-content__title-question">
                                        
//                                     </h1>
//                                     <ul class="quiz-content__variants-list quiz-content__variants-list--regular-list" data-quiz-list>
        
//                                     </ul>
//                                     <div class="quiz-content__progress">
//                                         <div class="quiz-content__progress-bar">
//                                             <span class="quiz-content__progress-bar--line" data-quiz-progress></span>
//                                         </div>
//                                         <p class="quiz-content__progress-info"><span data-quiz-current>1</span>-й вопрос из ${quiz.checks.checkAmountQuests(json)}</p>
//                                     </div>
//                                     <div class="quiz-content__btns">
//                                         <button class="quiz-btn quiz-content__btn quiz-content__btn-back" data-quiz-back>
//                                             Назад
//                                         </button>
//                                         <button class="quiz-btn quiz-content__btn quiz-content__btn-next" data-quiz-next>
//                                             Далее
//                                         </button>
//                                     </div>
        
//                                 </div>
//                                 <div class="quiz-content__card-side quiz-content__card-side--right">
//                                     <div class="quiz-content__person">
//                                         <div class="quiz-content__person-img">
//                                             <img src="${quiz.create.staticItems.createBaseItem(json, 'srcImgPerson', true)}" alt="person">
//                                         </div>
//                                         <div class="quiz-content__person-desc">
//                                             <h3>
//                                                 ${quiz.create.staticItems.createBaseItem(json, 'namePerson', true)}
//                                             </h3>
//                                             <small>
//                                                 ${quiz.create.staticItems.createBaseItem(json, 'descPerson', true)}
//                                             </small>
//                                         </div>
//                                     </div>
//                                     <svg class="quiz-content__polyline-wrap">
//                                         <path d="M-2.40416e-06 29.5004L100 29.5004L100 2L130 29.5004L330 29.5004" fill="none" stroke="black"/>                      
//                                     </svg>
//                                     <div class="quiz-content__about">
        
//                                     </div>
//                                     <div class="quiz-content__comp-logo">
//                                         <img src="${quiz.create.staticItems.createBaseItem(json, 'srcLogoPerson', true)}" alt="company logo">
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         `
//     }
        
//     function getFinTemplate(json) {
//         return `
//         <div class="quiz-wrapper" data-quiz-wrapper data-quiz-wrapper>
//             <span class="quiz-shadow"></span>
//             <div class="quiz">
//                 <div class="quiz-container">
//                     <div class="quiz-content">
//                         <h1 class="quiz-content__title-know quiz-content__title-know--fin">
//                             ${quiz.create.staticItems.createBaseItem(json, 'titleKnow', false)}
//                         </h1>
//                         <button class="quiz-content__btn-close quiz-content__btn-close--fin" data-quiz-close>
//                             <span></span>
//                             <span></span>
//                         </button>
//                         <div class="quiz-content__card quiz-content__card--fin">
//                             <div class="quiz-content__card-side quiz-content__card-side--left quiz-content__card-side--left-fin">
//                                 <div class="quiz-content__gratitude">
//                                     ${quiz.create.staticItems.createSomeBlocks(json, 'gratitude-text', false)}
//                                 </div>
//                                 <img class="quiz-content__fin-bg" src="${quiz.create.staticItems.createBaseItem(json, 'fin-bg', false)}" alt="">
//                             </div>
//                             <div class="quiz-content__card-side quiz-content__card-side--right quiz-content__card-side--right-fin" data-quiz-text-container>
//                                 <div class="quiz-content__contacts">
//                                     <div class="quiz-content__contacts-add">
//                                         <img class="quiz-content__sketch" src="${quiz.create.staticItems.createBaseItem(json, 'sketch-img', false)}" alt="sketch">
//                                         <h4>
//                                             ${quiz.create.staticItems.createBaseItem(json, 'titleAdd', false)}
//                                         </h4>
//                                         ${quiz.create.staticItems.createSomeBlocks(json, 'subtitleAdd', false)}
//                                     </div>
    
//                                     <form action="" class="quiz-content__contacts-form" data-quiz-form>
//                                     <h2 class="quiz-content__contacts-title quiz-content__contacts-title--form">
//                                         ${quiz.create.staticItems.createBaseItem(json, 'titleContacts', false)}
//                                     </h2>
//                                     <p class="quiz-content__contacts-subtitle quiz-content__contacts-subtitle--form">
//                                         ${quiz.create.staticItems.createBaseItem(json, 'subtitleContacts', false)}
//                                     </p>
//                                         <input class="quiz-input" type="tel" placeholder="Телефон *">
//                                         <input class="quiz-input" type="email" placeholder="Email *">
//                                         <button class="quiz-btn" type="submit" data-quiz-send>${quiz.create.staticItems.createBaseItem(json, 'btnForm', false)}</button>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
        
//         `
//     }
    
//     $('[data-quiz-toggle]').click(function() {
//         $.getJSON($(this).data('quiz-url'), function(data) {
//             quiz.init(data)
//         })
//     })
    
// })