<form class="popup-form" data-popup-form-item data-form-handle>
	<h3 class="section-title popup-title">
		Оставьте свои контакты
	</h3>
	<p class="section-subtitle popup-subtitle">
		Мы свяжемся с вами в течение рабочего дня
	</p>
	<div class="popup-form__wrap">
		
		<input type="text" class="popup-form__field popup-form__input main-form__field main-form__input"
		       name="name"
		       required
		       placeholder="Имя">
		<input type="tel" class="popup-form__field popup-form__input main-form__field main-form__input"
		       name="phone"
		       data-phone
		       required
		       placeholder="Телефон">
		<input type="email" class="popup-form__field popup-form__input main-form__field main-form__input"
		       name="email"
		       required
		       placeholder="Почта">
		<textarea name="message" id="#" cols="30" rows="5"
		          class="popup-form__field popup-form__textarea  main-form__field main-form__textarea"
		          required
		          placeholder="Можете кратко описать вашу проблему"></textarea>
		
		<input type="hidden" name="form_name" value="Заявка со страницы <? the_title(); ?>">
		
		<small class="popup-form__privacy main-form__privacy">
			Отправляя заявку, вы соглашаетесь с <a href="#policy" data-fancybox>Политикой конфиденциональности</a>
		</small>
		<button type="submit" class="popup-form__btn-submit main-form__btn-submit">
			Отправить
		</button>
	</div>
	
	<button class="popup-form__btn-close" data-popup-form-close>
		<span></span>
		<span></span>
	</button>
</form>

<div class="popup-shadow" data-popup-form-shadow></div>