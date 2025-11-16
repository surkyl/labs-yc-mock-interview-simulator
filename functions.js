/* --- Question Functions ---
   -------------------------------------------------- */

function next_q()
{
	if ( $('#end').hasClass('hide') == true )
	{
		var question = q.shift();
		
		if (question != 'done')
		{
			// Animate question change
			$('#question-container').css('opacity', 0).css('transform', 'translateY(20px)');
			
			setTimeout(function() {
				$('#question').html(question);
				$('#question-container').css('opacity', 1).css('transform', 'translateY(0)');
			}, 200);
			
			answeredQuestions++;
			updateProgress();
			
			timer_restart();
			display_tip();
		} else
		{
			$('#question-container').addClass('hide');
			$('#timer-container').addClass('hide');
			$('.pg').addClass('hide');
			$('.tip-container').addClass('hide');
			$('.controls').addClass('hide');
			
			$('#end').removeClass('hide');
		}
	}
}



/* --- Timer Functions ---
   -------------------------------------------------- */

function timer_tick()
{
	$('#timer-container').removeClass('timer-warning');
	$('#timer-container').removeClass('timer-fail');
	
	timer = timer - 1;
	
	$('#timer').html(timer);
	
	// Update circular progress
	var circumference = 283; // 2 * PI * 45
	var offset = circumference - (timer / 20) * circumference;
	$('.timer-progress').css('stroke-dashoffset', offset);
	
	if (timer < 10)
	{
		$('#timer-container').addClass('timer-warning');
	}
	if (timer < 5)
	{
		$('#timer-container').removeClass('timer-warning');
		$('#timer-container').addClass('timer-fail');
	}
	if (timer <= 0)
	{
		$('#timer-container').addClass('hide');
		$('.pg').removeClass('hide');
	}
	
	setTimeout('timer_tick();', 1000);
}

function timer_restart()
{
	$('#timer-container').removeClass('timer-warning');
	$('#timer-container').removeClass('timer-fail');
	$('.pg').addClass('hide');
	$('#timer-container').removeClass('hide');
	
	timer = 20;
	
	$('#timer').html('20');
	$('.timer-progress').css('stroke-dashoffset', 0);
}



/* --- Tip Functions ---
   -------------------------------------------------- */

function display_tip()
{
	var tip = tips.shift();
	
	// Animate tip change
	$('.tip').css('opacity', 0).css('transform', 'translateY(10px)');
	
	setTimeout(function() {
		$('#tip').html(tip);
		$('.tip').css('opacity', 1).css('transform', 'translateY(0)');
	}, 300);
	
	tips.push(tip);
}
