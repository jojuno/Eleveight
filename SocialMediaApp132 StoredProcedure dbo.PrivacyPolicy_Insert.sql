USE [SocialMediaApp132]
GO
/****** Object:  StoredProcedure [dbo].[PrivacyPolicy_Insert]    Script Date: 9/11/2018 7:41:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Moonsoo Jo>
-- Create date: <07/13/2018>
-- Description:	<Insert a Privacy Policy>
-- =============================================
ALTER PROCEDURE [dbo].[PrivacyPolicy_Insert]
	-- Add the parameters for the stored procedure here
	@Id int Output,
	@Heading nvarchar(200),
	@Body nvarchar(4000),
	@DisplayOrder int
AS
BEGIN
/* TEST SCRIPT
DECLARE	@return_value int,
		@Id int

EXEC	@return_value = [dbo].[PrivacyPolicy_Insert]
		@Id = @Id OUTPUT,
		@Heading = N'Entertainment and Related Services',
		@Body = N'Entertainment and Related Services power rich experiences and enable you to access a variety of content, applications and games.',
		@DisplayOrder = 11

SELECT	@Id as N'@Id'

SELECT	'Return Value' = @return_value
*/
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT into dbo.PrivacyPolicy ([Heading], [Body], [DisplayOrder])
	values (@Heading, @Body, @DisplayOrder)
	set @Id = SCOPE_IDENTITY()
END
